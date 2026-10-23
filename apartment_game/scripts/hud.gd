extends Control

@onready var fps_label: Label = $TopBar/FPSLabel
@onready var mode_label: Label = $TopBar/ModeLabel
@onready var player: Node = get_tree().get_first_node_in_group("player")

func _ready() -> void:
	$TopBar/Rooms/BtnLiving.pressed.connect(func(): _teleport(Vector3(3.6, 0.2, 6.2), 0.5))
	$TopBar/Rooms/BtnKitchen.pressed.connect(func(): _teleport(Vector3(6.2, 0.2, 3.2), -1.2))
	$TopBar/Rooms/BtnDining.pressed.connect(func(): _teleport(Vector3(4.3, 0.2, 4.2), 0.1))
	$TopBar/Rooms/BtnBedroom.pressed.connect(func(): _teleport(Vector3(7.5, 0.2, 7.8), 2.4))
	$TopBar/Rooms/BtnBathroom.pressed.connect(func(): _teleport(Vector3(9.5, 0.2, 5.5), 1.8))
	$BottomBar/BtnCam.pressed.connect(func(): _toggle_camera())

func _process(_delta: float) -> void:
	fps_label.text = "FPS: %d" % Engine.get_frames_per_second()
	if player:
		mode_label.text = "Baxış: %s (C ilə dəyiş)" % ("1-ci Şəxs (Göz)" if player.is_first_person else "3-cü Şəxs (Arxa)")

func _teleport(pos: Vector3, yaw: float) -> void:
	if player:
		player.teleport_to(pos, yaw)
		Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _toggle_camera() -> void:
	if player:
		player.is_first_person = !player.is_first_person
		player._update_camera_mode()
