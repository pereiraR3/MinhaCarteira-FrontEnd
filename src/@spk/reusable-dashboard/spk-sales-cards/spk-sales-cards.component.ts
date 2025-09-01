import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'spk-sales-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-sales-cards.component.html',
  styleUrl: './spk-sales-cards.component.scss'
})
export class SpkSalesCardsComponent {
  @Input() card!: {

    value?: string ;
    graph?: string ;
    valueClass?: string ;
    percentage?: string ;
    colClass?: string ;
    cardClass?: string ;
    icon?: string ;
    bg?: string ;
    color?: string ;
    customClass?: string ;
    customClass1?: string ;
    titleClass?: string ;
    title?: string ;
    svgClass?: string ;
    percentageIcon?: string ;
   svg?: any; 
 };

 constructor(private sanitizer: DomSanitizer) {}
 sanitizeHtml(html: string): SafeHtml {
   return this.sanitizer.bypassSecurityTrustHtml(html);
 }
 sanitizeIcon(svg: string): SafeHtml {
   return this.sanitizer.bypassSecurityTrustHtml(svg);
 }
}
