import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashbordService } from '../shared/service/dashbord.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dashboard-administration',
  templateUrl: './dashboard-administration.component.html',
  styleUrls: ['./dashboard-administration.component.scss']
})
export class DashboardAdministrationComponent implements OnInit, OnDestroy {

  knobValue: number = 90;

  selectedWeek: any;

  weeks: any[] = [];

  barData: any;

  cards: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  products: any[]=[];

  listTypeAssure: any[]=[];

  listSectAssure: any[]=[]

  labelsBar: any[]=[];

  numbersBar: any[]=[];

  anneeAss:any[]=[]
  valeurAnAss: any[]=[]

  subscription: Subscription;

  

  cols: any[] = [];

  constructor( 
    private layoutService: LayoutService, 
    private dashbordService : DashbordService) {
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

      this.cols = [
          {header: 'Name', field: 'name'},
          {header: 'Category', field: 'category'},
          {header: 'Price', field: 'price'},
          {header: 'Status', field: 'inventoryStatus'}
      ]
  }

  getStatAssure(): void {
    this.dashbordService.getCards().subscribe(
      {
        next: (result: { body: any; }) => {
          if (result && result.body) {
            this.cards = result.body!

          }
        },
        error: (reason: any) => {
          console.error(JSON.stringify(reason));
        }
      });
  }

  getStatTypeAssure(): any {

    this.dashbordService.getNbTypeAssure().subscribe(
      {
        next: (result: { body: any[]; }) => {
          if (result && result.body) {
            this.listTypeAssure = result.body
            let labels = this.listTypeAssure.map(typeAss => {
                return typeAss.typeAssure
            })
            let datas = this.listTypeAssure.map(typeAss => {
                return typeAss.nombreTotalAssure
            })
            this.barData = {
                labels: labels,
                datasets: [
                    {
                        label: 'NOMBRE',
                        data: datas,
                        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                        borderColor: ['rgb(54, 162, 235)', 'rgb(54, 162, 235)', 'rgb(54, 162, 235)', 'rgb(54, 162, 235)'],
                        borderWidth: 1
                    }
                ]
              };
          }
        },
        error: (reason: any) => {
          console.error(JSON.stringify(reason));
          
        }
       
      });
      
      
  }

  getSecteurAssure(): any {

    this.dashbordService.getNbAffilieSect().subscribe(
      {
        next: (result: { body: any[]; }) => {
          if (result && result.body) {
            this.listSectAssure = result.body
            //console.log(this.listSectAssure)
            let anneeAss = this.listSectAssure.map(sectAss => {
                return sectAss.annee
            })
            this.anneeAss = anneeAss[0]
            let valeurAnAss = this.listSectAssure.map(sectAss => {
                return sectAss.valeur
            })

            //console.log(valeurAnAss)
            this.valeurAnAss = valeurAnAss
          }
        },
        error: (reason: any) => {
          console.error(JSON.stringify(reason));
          
        }
       
      });
      
      
  }

  getPieAssure(): any {

    this.dashbordService.getNbTypeAssure().subscribe(
      {
        next: (result: { body: any[]; }) => {
          if (result && result.body) {
            this.listTypeAssure = result.body
            let labelSecteur = this.listTypeAssure.map(typeAss => {
                return typeAss.typeAssure
            })
            let nombreSecteur = this.listTypeAssure.map(typeAss => {
                return typeAss.nombreTotalAssure
            })
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            this.pieData = {
                labels: labelSecteur,
                datasets: [
                    {
                        data: nombreSecteur,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--yellow-400'),
                            documentStyle.getPropertyValue('--blue-400'),
                            documentStyle.getPropertyValue('--green-100'),
                            documentStyle.getPropertyValue('--red-500'),
                        ],
                        hoverBackgroundColor: [
                          documentStyle.getPropertyValue('--yellow-400'),
                          documentStyle.getPropertyValue('--blue-400'),
                          documentStyle.getPropertyValue('--green-100'),
                          documentStyle.getPropertyValue('--red-500'),
                        ]
                    }
                ]
            };
          }
        },
        error: (reason: any) => {
          console.error(JSON.stringify(reason));
          
        }
       
      });
    }

  initCharts() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      
      this.getStatAssure();
      this.getStatTypeAssure()
      this.getSecteurAssure()
      this.getPieAssure()

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

  onWeekChange() {
      let newBarData = {...this.barData};
      newBarData.datasets[0].data = this.selectedWeek.data[0];
      newBarData.datasets[1].data = this.selectedWeek.data[1];
      this.barData = newBarData;
  }
  
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ngOnDestroy(): void {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

}
