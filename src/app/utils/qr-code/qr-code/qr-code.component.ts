import { Component, Input } from '@angular/core';
import { QRCodeErrorCorrectionLevel, QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss',
})
export class QrCodeComponent {
  @Input('dataString') dataString: string = 'Your data string';
  @Input('errorCorrectionLevel') errorCorrectionLevel: QRCodeErrorCorrectionLevel = 'M';
  @Input('width') width = 256;
}
