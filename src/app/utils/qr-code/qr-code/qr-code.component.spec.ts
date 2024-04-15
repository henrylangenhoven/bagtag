import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QrCodeComponent } from './qr-code.component';

describe('QrCodeComponent', () => {
  let component: QrCodeComponent;
  let fixture: ComponentFixture<QrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default dataString', () => {
    expect(component.dataString).toEqual('Your data string');
  });

  it('should have default errorCorrectionLevel', () => {
    expect(component.errorCorrectionLevel).toEqual('M');
  });

  it('should have default width', () => {
    expect(component.width).toEqual(256);
  });

  it('should update dataString when input changes', () => {
    component.dataString = 'New data string';
    fixture.detectChanges();
    expect(component.dataString).toEqual('New data string');
  });

  it('should update errorCorrectionLevel when input changes', () => {
    component.errorCorrectionLevel = 'H';
    fixture.detectChanges();
    expect(component.errorCorrectionLevel).toEqual('H');
  });

  it('should update width when input changes', () => {
    component.width = 512;
    fixture.detectChanges();
    expect(component.width).toEqual(512);
  });

  it('should render QR code with correct data', () => {
    component.dataString = 'New data string';
    fixture.detectChanges();
    const qrCodeElement = fixture.debugElement.query(By.css('qrcode')).nativeElement;
    expect(qrCodeElement.getAttribute('qrcode')).toBeDefined();
  });
});
