import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit, OnDestroy {
  knobValue: number = 90;

  selectedWeek: any;

  weeks: any[] = [];

  barData: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  products: any[] = [];

  subscription: Subscription;

  cols: any[] = [];

  constructor(
    private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(config => {
      this.initCharts();
    });
  }

  ngOnInit(): void {
    this.weeks = [{
        label: 'Last Week', 
        value: 0,
        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
    }, 
    {
        label: 'This Week', 
        value: 1,
        data: [[35, 19, 40, 61, 16, 55, 30], [48, 78, 10, 29, 76, 77, 10]]
    }];

    this.selectedWeek = this.weeks[0];
    this.initCharts();
    //this.productService.getProductsSmall().then(data => this.products = data);
    
    this.products = [
      {
        'id' : 1,

      }
    ]

    this.cols = [
        {header: 'Name', field: 'name'},
        {header: 'Category', field: 'category'},
        {header: 'Price', field: 'price'},
        {header: 'Status', field: 'inventoryStatus'}
    ]
}

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.barData = {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                barThickness: 12,
                borderRadius: 12,
                data: this.selectedWeek.data[0]
            },
            {
                label: 'Profit',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                barThickness: 12,
                borderRadius: 12,
                data: this.selectedWeek.data[1]
            }
        ]
    };

    this.pieData = {
        labels: ['Affiliation', 'Fashion', 'Household'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    documentStyle.getPropertyValue('--primary-700'),
                    documentStyle.getPropertyValue('--primary-400'),
                    documentStyle.getPropertyValue('--primary-100')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--primary-600'),
                    documentStyle.getPropertyValue('--primary-300'),
                    documentStyle.getPropertyValue('--primary-200')
                ]
            }
        ]
    };

    this.barOptions = {
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    font: {
                        weight: 700,
                    },
                    padding: 28
                },
                position: 'bottom'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    this.pieOptions = {
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    font: {
                        weight: 700,
                    },
                    padding: 28
                },
                position: 'bottom'
            }
        }
    };
}

}
