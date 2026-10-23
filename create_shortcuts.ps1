$WshShell = New-Object -ComObject WScript.Shell
$targetExe = 'C:\Users\lenovo\Downloads\marneuli\Marneuli_Game_Standalone\Marneuli_Residence.exe'
$workDir = 'C:\Users\lenovo\Downloads\marneuli\Marneuli_Game_Standalone'
$arguments = 'resources\app'

$desktopPath = [Environment]::GetFolderPath('Desktop')
$s1 = $WshShell.CreateShortcut("$desktopPath\Marneuli_Residence.lnk")
$s1.TargetPath = $targetExe
$s1.Arguments = $arguments
$s1.WorkingDirectory = $workDir
$s1.Description = 'Marneuli Residence 3D Fotorealistik Oyun'
$s1.Save()

$s2 = $WshShell.CreateShortcut('C:\Users\lenovo\Downloads\marneuli\Marneuli_Residence.lnk')
$s2.TargetPath = $targetExe
$s2.Arguments = $arguments
$s2.WorkingDirectory = $workDir
$s2.Description = 'Marneuli Residence 3D Fotorealistik Oyun'
$s2.Save()

$s3 = $WshShell.CreateShortcut('C:\Users\lenovo\Downloads\marneuli\plan\Marneuli_Residence.lnk')
$s3.TargetPath = $targetExe
$s3.Arguments = $arguments
$s3.WorkingDirectory = $workDir
$s3.Description = 'Marneuli Residence 3D Fotorealistik Oyun'
$s3.Save()

Write-Host "Shortcuts successfully created!"
