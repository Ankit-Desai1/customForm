import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit, AfterViewInit {

  @ViewChild('graph')
  graph!: ElementRef;
  lineChart: any;

  name = new FormControl('',[Validators.required]);
  bodyRegion = new FormControl('',[Validators.required]);
  description = new FormControl('',[Validators.required]);
  timePeriod = new FormControl('',[Validators.required]);
  time = new FormControl('',[Validators.required]);
  categoryName = new FormControl('',[Validators.required]);
  assesmentName = new FormControl('',[Validators.required]);
  assesmentDetailsType = new FormControl('',[Validators.required]);
  assesmentDetailsUnit = new FormControl('',[Validators.required]);
  assesmentDetailsRangeFrom = new FormControl('',[Validators.required,Validators.min(1)]);
  assesmentDetailsRangeTo = new FormControl('',[Validators.required,Validators.max(360)]);
  assesmentDetailsMeasuringRegion = new FormControl('',[Validators.required]);
  assesmentDetailsReferenceRegion = new FormControl('',[Validators.required]);
  typeOfSimple = new FormControl('',[Validators.required]);
  typeOfError = new FormControl('',[Validators.required]);
  typeOfDifference = new FormControl('',[Validators.required]);
  typeOfComparison = new FormControl('',[Validators.required]);
  valueOfSimple = new FormControl('',[Validators.required]);
  secondValueOfSimple = new FormControl('',[Validators.required]);
  valueOfError = new FormControl('',[Validators.required]);
  secondValueOfError = new FormControl('',[Validators.required]);
  valueOfDifference = new FormControl('',[Validators.required]);
  secondValueOfDifference = new FormControl('',[Validators.required]);
  valueOfComparison = new FormControl('',[Validators.required]);
  secondValueOfComparison = new FormControl('',[Validators.required]);
  assesmentDetailsDescription = new FormControl('',[Validators.required]);
  assesmentDetailsRoutine = new FormControl('',[Validators.required]);
  assesmentDetailsRoutineDays = new FormControl('',[Validators.required]);
  assesmentDetailsTime = new FormControl('',[Validators.required]);
  measurementForm: FormGroup | any;
  categoryArray:any[] = [];
  assesmentArray:any[] = [];
  getUnitOfAssesmentType:any[]=[];
  UnitOfAssesmentType:string='';
  Unit:string | undefined;
  isReferenceRegionVisible:boolean=false;
  valueOfRange:string='';
  measurementsType:string='no';
  measurementDefault:any=["simple"];
  isCategoryFormVisible:boolean=false;
  isAssesmentFormVisible:boolean=false;
  isAssesmentDetailFormVisible:boolean=true;
  isSimpleVisible:boolean = true;
  isErrorVisible:boolean = false;
  isDifferenceVisible:boolean = false;
  isComparisonVisible:boolean = false;
  isSecondInputSimpleVisible:boolean = false;
  isSecondInputErrorVisible:boolean = false;
  isSecondInputDifferenceVisible:boolean = false;
  isSecondInputComparisonVisible:boolean = false;
  selectedDays:any[]=[];
  data= [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15];
  chartDataOfSimple:any[]=[];
  chartDataOfError:any[]=[];
  chartDataOfDifference:any[]=[];
  chartDataOfComparison:any[]=[];
  dataset:any[]=[];
  dataOfChart:any[]=[];
  assesmentDetailsTypeArray:any[] = [
    {name:"Length dimension", value:"lengthDimension"},
    {name:"Quantity", value:"quantity"},
    {name:"Temperature", value:"temperature"},
    {name:"Angular dimension", value:"angularDimension"},
  ];

  assesmentDetailsUnitArray:any[]=[
    {name:"lengthDimension",type:"Milimeter", value:"milimeter"},
    {name:"lengthDimension",type:"Meter", value:"meter"},
    {name:"quantity",type:"Number", value:"number"},
    {name:"temperature",type:"Celcius", value:"celcius"},
    {name:"angularDimension",type:"Degree", value:"degree"}
  ];

  measurementsArray:any[]=[
    {sc:"no",name:"Simple",value:"simple",isSelected:true},
    {sc:"no",name:"Error rate",value:"errorRate",isSelected:false},
    {sc:"yes",name:"Difference",value:"difference",isSelected:false},
    {sc:"yes",name:"Comparision",value:"comparision",isSelected:false},
  ];

  valueComparisonArray:any[]=[
    {name:"Equal to",value:"equalTo"},
    {name:"Not equal to",value:"notEqualTO"},
    {name:"Greater than",value:"greaterThan"},
    {name:"Greater tahn or equal to",value:"gretaerOrEqual"},
    {name:"Less than",value:"lessThan"},
    {name:"Less than or equal to",value:"lessOrEqual"},
    {name:"In between",value:"inBetween"},
    {name:"Not in between",value:"notInBetween"},
  ];

  routineArray:any[] = [
    {name:"Selected weekdays", value:"SelectedWeekdays"},
    {name:"Daily", value:"daily"},
  ];

  week=["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"];

  timeArray:any[]=[];
  
  constructor(private _fb:FormBuilder) {
    this.measurementForm = this._fb.group({
      measurementArray: this._fb.array([this.addTimePeriod()])
    });
   }
  ngAfterViewInit(): void {
    
    //this.getGraph();
  }

  private dataSub: Subscription | undefined;

  ngOnInit(): void {
    this.dataSub = this.assesmentDetailsUnit.valueChanges.subscribe(value => {
      this.assesmentDetailsRangeFrom.reset();
      this.assesmentDetailsRangeTo.reset();
      if (value === 'milimeter') {
        this.assesmentDetailsRangeTo.setValidators([Validators.min(1),Validators.max(10000)]);
        this.valueOfRange="10000";
      }
      else if (value === 'meter') {
        this.assesmentDetailsRangeTo.setValidators([Validators.min(1),Validators.max(1000)]);
        this.valueOfRange="1000";
      }
      else if (value === 'number') {
        this.assesmentDetailsRangeTo.setValidators([Validators.min(1),Validators.max(9999)]);
        this.valueOfRange="9999";
      }
      else if (value === 'celcius') {
        this.assesmentDetailsRangeTo.setValidators([Validators.min(1),Validators.max(50)]);
        this.valueOfRange="50";
      }
      else if (value === 'degree') {
        this.assesmentDetailsRangeTo.setValidators([Validators.min(1),Validators.max(360)]);
        this.valueOfRange="360";
      }
    });
  }

  firstForm = new FormGroup({
    name: this.name,
    bodyRegion: this.bodyRegion,
    description: this.description,
  });

  categoryForm = new FormGroup({
    categoryName: this.categoryName,
  });

  assesmentForm = new FormGroup({
    assesmentName: this.assesmentName,
  });

  assesmentDetailsForm  = new FormGroup({
    assesmentDetailsRangeFrom: this.assesmentDetailsRangeFrom,
    assesmentDetailsRangeTo: this.assesmentDetailsRangeTo,
  });

  submit(){
    console.log(this.firstForm.value);
  }

  addTimePeriod(){
    return this._fb.group({
      time:this.time,
      timePeriod:this.timePeriod,
    });
  }

  get formArray(){
    return this.measurementForm.get("measurementArray") as FormArray;
  }

  addNewMeasurement(){
    this.formArray.push(this.addTimePeriod());
  }

  addInCategory(){
    // console.log(this.categoryForm.value.categoryName);
    // console.log(this.categoryArray);
    this.isCategoryFormVisible = true;
    
    for(let time of this.measurementForm.value.measurementArray){
      this.timeArray.push(time);
    }
    console.log( this.measurementForm.value.measurementArray);
  }

  addInAssesment(){
    this.isAssesmentFormVisible = true;
  }

  changeAssesmentType(event:any){
    this.UnitOfAssesmentType = event;
    this.getUnitOfAssesmentType = this.assesmentDetailsUnitArray.filter(items => {
        return items.name == this.UnitOfAssesmentType
    });
    console.log(this.getUnitOfAssesmentType);
  }

  changeAssesmentUnit(event:any){
    this.Unit = event;
  }

  

  sideComparison(event:any){
    if(event.checked){
      this.isReferenceRegionVisible = true;
      this.measurementsType="yes";
    }
    else{
      this.isReferenceRegionVisible = false;
      this.measurementsType="no";
    }
  }

  get getMeasurements() {
    if(this.measurementsType == "yes"){
      return this.measurementsArray;
    }
    else {
      return this.measurementsArray.filter(items => {
        return items.sc == this.measurementsType
      })
    }
  }

  selectMeasurement(event:any){
    if(event.indexOf("simple") !== -1){
      this.isSimpleVisible = true;
    }
    else{
      this.isSimpleVisible = false;
    }
    if(event.indexOf("errorRate") !== -1){
      this.isErrorVisible = true ;
    }
    else{
      this.isErrorVisible = false;
    }
    if(event.indexOf("difference") !== -1){
      this.isDifferenceVisible = true;
    }
    else{
      this.isDifferenceVisible = false;
    }
    if(event.indexOf("comparision") !== -1){
      this.isComparisonVisible = true;
    }
    else{
      this.isComparisonVisible = false;
    }
    this.dataOfGraph();
  }

  changeInSimple(event:any){
    if(event == "inBetween" || event == "notInBetween"){
      this.isSecondInputSimpleVisible = true ;
    }
    else{
      this.isSecondInputSimpleVisible = false ;
    }
  }

  changeInError(event:any){
    if(event == "inBetween" || event == "notInBetween"){
      this.isSecondInputErrorVisible = true;
    }
    else{
      this.isSecondInputErrorVisible = false;
    }
  }

  changeInDifference(event:any){
    if(event == "inBetween" || event == "notInBetween"){
      this.isSecondInputDifferenceVisible = true;
    }
    else{
      this.isSecondInputDifferenceVisible = false;
    }
  }

  changeInComparison(event:any){
    if(event == "inBetween" || event == "notInBetween"){
      this.isSecondInputComparisonVisible = true;
    }
    else{
      this.isSecondInputComparisonVisible = false;
    }
  }

  simpleChange(event:any){
    this.chartDataOfSimple= this.data.filter(item =>{
      return item > event.target.value
    });
    
    this.dataOfGraph();
  }

  errorChange(event:any){
    this.chartDataOfError= this.data.filter(item =>{
      return item > event.target.value
    });
    this.dataOfGraph();
  }

  differenceChange(event:any){
    this.chartDataOfDifference= this.data.filter(item =>{
      return item > event.target.value
    });
    this.dataOfGraph();
  }

  comparisonChange(event:any){
    this.chartDataOfComparison= this.data.filter(item =>{
      return item > event.target.value
    });
    this.dataOfGraph();
  }

  routineChange(event:any){
    console.log(event);
    if(event == "daily"){
    this.selectedDays= this.week;
    }
    else{
      this.selectedDays=[];
    }
  }

  getGraph() {
    if(this.lineChart){
      this.lineChart.destroy();
    }
    this.lineChart = new Chart(this.graph.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mo','Tu','We','Th','Fr','Sa','Su'],
        datasets: this.dataset,
      }
    });
    
  }

  dataOfGraph(){
    this.dataset=[];
    if(this.isSimpleVisible){
      this.dataset.push({
        label: "simple",
        borderColor: 'rgba(75,192,192,1)',
        data: this.chartDataOfSimple
      });
    }
    if(this.isErrorVisible){
      this.dataset.push({
        label: "Error",
        borderColor: 'rgba(75,92,12,1)',
        data: this.chartDataOfError
      });
    }
    if(this.isDifferenceVisible){
      this.dataset.push({
        label: "Difference",
        borderColor: 'rgba(184,55,55)',
        data: this.chartDataOfDifference
      });
    }
    if(this.isComparisonVisible){
      this.dataset.push({
        label: "Comparison",
        borderColor: 'rgba(45,302,92,1)',
        data: this.chartDataOfComparison
      });
    }
      this.getGraph();    
  }

  inAssesment(){
    if(this.categoryForm.valid){
      this.categoryArray.push(this.categoryForm.value.categoryName);
      this.isCategoryFormVisible = false;
      this.isAssesmentFormVisible = true;
      this.categoryForm.reset();
    }
  }

  inAssesmentDetail(){
    if(this.assesmentForm.valid){
      this.assesmentArray.push(this.assesmentForm.value.assesmentName);
      this.assesmentForm.reset();
      this.isAssesmentDetailFormVisible = true;
      this.isAssesmentFormVisible = false;
    }
  }

  validationOfRange(){
    if(this.assesmentDetailsRangeTo.value < this.assesmentDetailsRangeFrom.value){
      console.log('invalid');
      return ` value between 1 and '${this.valueOfRange}'`
    }
    else{
      console.log('mnmnm');
      return 'df'
    }
  }
}
