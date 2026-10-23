extends CharacterBody3D

# --- Speeds & Physics ---
const SPEED_WALK = 2.2
const SPEED_SPRINT = 4.2
const ACCELERATION = 12.0
const FRICTION = 14.0
const JUMP_VELOCITY = 3.6
var gravity: float = 9.8

# --- Camera & Mouse Look ---
const MOUSE_SENSITIVITY = 0.0022
var target_yaw: float = 0.0
var target_pitch: float = 0.0
var current_yaw: float = 0.0
var current_pitch: float = 0.0

@onready var head: Node3D = $Head
@onready var cam_first: Camera3D = $Head/CameraFirstPerson
@onready var spring_arm: SpringArm3D = $SpringArm3D
@onready var cam_third: Camera3D = $SpringArm3D/CameraThirdPerson
@onready var flashlight: SpotLight3D = $Head/CameraFirstPerson/Flashlight
@onready var avatar_mesh: Node3D = $AvatarMesh
@onready var left_leg: Node3D = $AvatarMesh/LeftLeg
@onready var right_leg: Node3D = $AvatarMesh/RightLeg
@onready var left_arm: Node3D = $AvatarMesh/LeftArm
@onready var right_arm: Node3D = $AvatarMesh/RightArm

var is_first_person: bool = true
var is_flashlight_on: bool = false
var walk_cycle: float = 0.0

func _ready() -> void:
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	target_yaw = rotation.y
	current_yaw = rotation.y
	_update_camera_mode()

func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed:
		if Input.mouse_mode != Input.MOUSE_MODE_CAPTURED:
			Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
			get_viewport().set_input_as_handled()

	if event is InputEventKey and event.pressed:
		if event.keycode == KEY_ESCAPE:
			if Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
				Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			else:
				Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
		elif event.keycode == KEY_C or event.keycode == KEY_V:
			is_first_person = !is_first_person
			_update_camera_mode()
		elif event.keycode == KEY_F:
			is_flashlight_on = !is_flashlight_on
			flashlight.visible = is_flashlight_on
		# Teleport hotkeys
		elif event.keycode == KEY_1:
			teleport_to(Vector3(3.6, 0.2, 6.2), 0.5) # Living Room
		elif event.keycode == KEY_2:
			teleport_to(Vector3(6.2, 0.2, 3.2), -1.2) # Kitchen
		elif event.keycode == KEY_3:
			teleport_to(Vector3(4.3, 0.2, 4.2), 0.1) # Dining
		elif event.keycode == KEY_4:
			teleport_to(Vector3(7.5, 0.2, 7.8), 2.4) # Bedroom
		elif event.keycode == KEY_5:
			teleport_to(Vector3(9.5, 0.2, 5.5), 1.8) # Bathroom

	if event is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
		target_yaw -= event.relative.x * MOUSE_SENSITIVITY
		target_pitch -= event.relative.y * MOUSE_SENSITIVITY
		target_pitch = clamp(target_pitch, deg_to_rad(-85.0), deg_to_rad(85.0))

func _update_camera_mode() -> void:
	cam_first.current = is_first_person
	cam_third.current = !is_first_person
	avatar_mesh.visible = !is_first_person

func teleport_to(pos: Vector3, new_yaw: float) -> void:
	global_position = pos
	velocity = Vector3.ZERO
	target_yaw = new_yaw
	current_yaw = new_yaw
	target_pitch = 0.0
	current_pitch = 0.0
	rotation.y = new_yaw
	head.rotation.x = 0.0

func _physics_process(delta: float) -> void:
	# Smooth turning interpolation
	current_yaw = lerp_angle(current_yaw, target_yaw, 18.0 * delta)
	current_pitch = lerp(current_pitch, target_pitch, 18.0 * delta)
	rotation.y = current_yaw
	head.rotation.x = current_pitch
	spring_arm.rotation.x = current_pitch

	# Gravity
	if not is_on_floor():
		velocity.y -= gravity * delta

	# Jump
	if Input.is_key_pressed(KEY_SPACE) and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Input movement
	var input_dir := Vector2.ZERO
	if Input.is_key_pressed(KEY_W) or Input.is_key_pressed(KEY_UP):
		input_dir.y += 1
	if Input.is_key_pressed(KEY_S) or Input.is_key_pressed(KEY_DOWN):
		input_dir.y -= 1
	if Input.is_key_pressed(KEY_A) or Input.is_key_pressed(KEY_LEFT):
		input_dir.x -= 1
	if Input.is_key_pressed(KEY_D) or Input.is_key_pressed(KEY_RIGHT):
		input_dir.x += 1
	input_dir = input_dir.normalized()

	var is_sprinting: bool = Input.is_key_pressed(KEY_SHIFT)
	var current_speed: float = SPEED_SPRINT if is_sprinting else SPEED_WALK

	# Direction relative to body rotation
	var direction := (transform.basis * Vector3(input_dir.x, 0, -input_dir.y)).normalized()

	if direction:
		velocity.x = lerp(velocity.x, direction.x * current_speed, ACCELERATION * delta)
		velocity.z = lerp(velocity.z, direction.z * current_speed, ACCELERATION * delta)
	else:
		velocity.x = move_toward(velocity.x, 0, FRICTION * delta)
		velocity.z = move_toward(velocity.z, 0, FRICTION * delta)

	move_and_slide()

	# Head bobbing & Limb animation
	var horizontal_speed: float = Vector2(velocity.x, velocity.z).length()
	if horizontal_speed > 0.2 and is_on_floor():
		var bob_freq: float = 14.0 if is_sprinting else 9.0
		walk_cycle += delta * bob_freq
		var bob_offset: float = sin(walk_cycle) * 0.03
		head.position.y = 1.65 + bob_offset

		# Animate avatar limbs
		if avatar_mesh.visible:
			left_leg.rotation.x = sin(walk_cycle) * 0.55
			right_leg.rotation.x = -sin(walk_cycle) * 0.55
			left_arm.rotation.x = -sin(walk_cycle) * 0.45
			right_arm.rotation.x = sin(walk_cycle) * 0.45
	else:
		head.position.y = lerp(head.position.y, 1.65, 10.0 * delta)
		if avatar_mesh.visible:
			left_leg.rotation.x = lerp(left_leg.rotation.x, 0.0, 10.0 * delta)
			right_leg.rotation.x = lerp(right_leg.rotation.x, 0.0, 10.0 * delta)
			left_arm.rotation.x = lerp(left_arm.rotation.x, 0.0, 10.0 * delta)
			right_arm.rotation.x = lerp(right_arm.rotation.x, 0.0, 10.0 * delta)
