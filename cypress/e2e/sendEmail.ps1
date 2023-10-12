param(
    [string]$recipientName,
    [string]$subject,
    [string]$bcc

)

#Write-Host "Recipient Name: $recipientName"

$filePath = 'cypress\e2e\tempFile.txt'
$fileContent = Get-Content $filePath

#Write-Host "File Content : $filepath"
#Write-Host $fileContent

$ol = New-Object -comObject Outlook.Application
Start-Sleep -Seconds 3
$mail = $ol.CreateItem(0)
$mail.Recipients.Add($recipientName)
$mail.Subject = $subject
$mail.BCC=$bcc
$mail.HTMLBody="<html><body>$fileContent</body></html>"
$mail.save()

$inspector = $mail.GetInspector
$inspector.Display()