extends Node3D

@export var door_name: String = "Qapı"
@export var open_angle: float = 95.0
@export var speed: float = 4.0

var is_open: bool = false
var current_angle: float = 0.0
var target_angle: float = 0.0
var player_in_zone: bool = false

@onready var pivot: Node3D = $Pivot
@onready var prompt_label: Label3D = $PromptLabel
@onready var door_panel: StaticBody3D = $Pivot/DoorPanel

func _ready() -> void:
	$InteractArea.body_entered.connect(_on_body_entered)
	$InteractArea.body_exited.connect(_on_body_exited)
	prompt_label.visible = false
	prompt_label.text = "[E] Qapını Aç"

func _on_body_entered(body: Node) -> void:
	if body.is_in_group("player"):
		player_in_zone = true
		prompt_label.visible = true
		_update_prompt()

func _on_body_exited(body: Node) -> void:
	if body.is_in_group("player"):
		player_in_zone = false
		prompt_label.visible = false

func _unhandled_input(event: InputEvent) -> void:
	if player_in_zone and event is InputEventKey and event.pressed and not event.echo:
		if event.keycode == KEY_E:
			toggle_door()
			get_viewport().set_input_as_handled()

func toggle_door() -> void:
	is_open = !is_open
	target_angle = deg_to_rad(open_angle) if is_open else 0.0
	_update_prompt()

func _update_prompt() -> void:
	prompt_label.text = "[E] Qapını Bağla" if is_open else "[E] Qapını Aç"

func _process(delta: float) -> void:
	if abs(current_angle - target_angle) > 0.001:
		current_angle = lerp_angle(current_angle, target_angle, speed * delta)
		pivot.rotation.y = current_angle
