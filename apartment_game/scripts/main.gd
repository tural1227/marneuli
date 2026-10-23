extends Node3D

@onready var apartment: Node3D = $ApartmentModel

func _ready() -> void:
	# Build trimesh colliders for all furniture and solid walls
	_setup_colliders_and_materials(apartment)
	print("Marneuli Residence 3D — Realistik Mənzil və Qapılar Hazırdır!")

func _setup_colliders_and_materials(node: Node) -> void:
	if node is MeshInstance3D and node.mesh:
		var name_lower = node.name.to_lower()
		# Do not collide with empty fixtures or existing static door panels
		if not "handle" in name_lower and not "cap" in name_lower:
			node.create_trimesh_collision()
		
		# Upgrade materials for photorealism
		for i in range(node.get_surface_override_material_count()):
			var mat = node.get_active_material(i)
			if mat is StandardMaterial3D:
				mat.roughness = clamp(mat.roughness, 0.15, 0.85)

	for child in node.get_children():
		_setup_colliders_and_materials(child)
