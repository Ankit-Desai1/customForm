import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit{

  @ViewChild('chart')
  chart!: ElementRef;
  lineChart: any;

  form: FormGroup | any;
  categoryArray:any[] = [];
  assesmentArray:any[] = [];
  getUnitOfAssesmentType:any[]=[];
  UnitOfAssesmentType:string='';
  Unit:string | undefined;
  isReferenceRegionVisible:boolean=false;
  valueOfRange:string='';
  measurementsType:string='no';
  measurementDefault:any=["simple"];
  isSideComparisonChecked:any = [];
  isCategoryFormVisible:boolean=true;
  isAssesmentFormVisible:string | undefined;
  isAssesmentDetailFormVisible:string | undefined;
  isSimpleVisible:boolean = true;
  isErrorVisible:boolean = false;
  isDifferenceVisible:boolean = false;
  isComparisonVisible:boolean = false;
  isSecondInputSimpleVisible:boolean = false;
  isSecondInputErrorVisible:boolean = false;
  isSecondInputDifferenceVisible:boolean = false;
  isSecondInputComparisonVisible:boolean = false;
  isTypeSelected:boolean = false;
  isNextFormVisible:boolean = false;
  isChartVisible:boolean = false;
  isChecked:boolean = false;
  selectedDays:any[]=[];
  dataOfSimple= [12,45,23,55,23,16,44,65,23 ,59,41 ,80, 81, 56, 55, 40, 10, 5, 50, 10, 15];
  dataOfError= [45,16,1,48,25,65,6,46,72,62,6,41 ,51 ,50,19 ,73 ,34 ,31,57, 47];
  dataOfDifference= [22 ,16, 63 ,40 ,58 ,36 ,18 , 45 , 49 , 66, 58, 38 ,41, 30 , 2, 24,49 ,14 ,8 , 79 , 15];
  dataOfComparison= [36, 59, 80, 53 , 21 , 72 , 26 , 64 , 10 , 1 , 30 , 45 , 11 , 60 , 50 , 58 , 28 ,79, 29 ,30 , 27 , 65 , 4];
  chartDataOfSimple:any[]=[];
  chartDataOfError:any[]=[];
  chartDataOfDifference:any[]=[];
  chartDataOfComparison:any[]=[];
  dataset:any[]=[];
  dataOfChart:any[]=[];
  lastCategoryFormNo:number=0;
  lastAssesmentFormNo:number=0;
  currentCategoryFormNo:number=0;
  currentAssesmentFormNo:number=0;

  assesmentDetailsTypeArray:any[] = [
    {name:"Length dimension", value:"lengthDimension"},
    {name:"Quantity", value:"quantity"},
    {name:"Temperature", value:"temperature"},
    {name:"Angular dimension", value:"angularDimension"},
  ];

  assesmentDetailsUnitArray:any[]=[
    {name:"lengthDimension",type:"Milimeter", value:"milimeter"},
    {name:"quantity",type:"Number", value:"number"},
    {name:"temperature",type:"Celcius", value:"celcius"},
    {name:"angularDimension",type:"Degree", value:"degree"}
  ];

  measurementsArray:any[]=[
    {sc:"no",name:"Simple",value:"simple"},
    {sc:"no",name:"Error rate",value:"errorRate"},
    {sc:"yes",name:"Difference",value:"difference"},
    {sc:"yes",name:"Comparision",value:"comparision"},
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
    this.createForm();
   }


  ngOnInit(): void {
  }

  createForm(){
    this.form = this._fb.group({
      name : new FormControl('',[Validators.required]),
      bodyRegion : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      measurementArray: this._fb.array([this.addTimePeriod()]),
      categoryArray: this._fb.array([this.addCategory()])
    });
  }

  addNewMeasurement(){
    const control = <FormArray>this.form.controls['measurementArray'];
    control.push(this.addTimePeriod());
  }

  addCategory(){
    return this._fb.group({
    categoryName:  new FormControl('',[Validators.required]),
    assesmentArray: this._fb.array([this.addAssesment()])
    });
  }

  addAssesment(){
    return this._fb.group({
      assesmentName: new FormControl('',[Validators.required]),
      assesmentDetailsType :new FormControl('',[Validators.required]),
      assesmentDetailsUnit: new FormControl('',[Validators.required]),
      assesmentDetailsRangeFrom: new FormControl('',[Validators.required,Validators.min(1)]),
      assesmentDetailsRangeTo: new FormControl('',[Validators.required,Validators.max(360)]),
      assesmentDetailsMeasuringRegion: new FormControl('',[Validators.required]),
      assesmentDetailsReferenceRegion: new FormControl('',[Validators.required]),
      assesmentDetailsMeasurements : new FormControl('',[Validators.required]),
      typeOfSimple: new FormControl('',[Validators.required]),
      typeOfError: new FormControl('',[Validators.required]),
      typeOfDifference: new FormControl('',[Validators.required]),
      typeOfComparison: new FormControl('',[Validators.required]),
      valueOfSimple: new FormControl('',[Validators.required,Validators.min(1)]),
      secondValueOfSimple: new FormControl('',[Validators.required,Validators.min(1)]),
      valueOfError: new FormControl('',[Validators.required,Validators.min(1)]),
      secondValueOfError: new FormControl('',[Validators.required,Validators.min(1)]),
      valueOfDifference: new FormControl('',[Validators.required,Validators.min(1)]),
      secondValueOfDifference: new FormControl('',[Validators.required,Validators.min(1)]),
      valueOfComparison : new FormControl('',[Validators.required,Validators.min(1)]),
      secondValueOfComparison : new FormControl('',[Validators.required,Validators.min(1)]),
      assesmentDetailsDescription : new FormControl('',[Validators.required]),
      assesmentDetailsRoutine : new FormControl('',[Validators.required]),
      assesmentDetailsRoutineDays : new FormControl('',[Validators.required]),
      assesmentDetailsTime : new FormControl(''),
      });
  }

  addTimePeriod(){
    return this._fb.group({
      time:new FormControl(''),
      timePeriod:new FormControl(''),
    });
  }

  addInCategory(){                      // for add category in formarray
    this.validatorOfForm();
    if(this.isNextFormVisible){
      this.isCategoryFormVisible = true;
      const control = <FormArray>this.form.controls['categoryArray'];
      control.push(this.addCategory());
      this.lastCategoryFormNo = this.lastCategoryFormNo + 1; 
      this.lastAssesmentFormNo = 0;
      this.setDefault();
    }
  }

  addInAssesment(data:any){              // for add assesment in formarray
    this.validatorOfForm();
    if(this.isNextFormVisible){
      const control = (<FormArray>this.form.controls['categoryArray']).at(data).get('assesmentArray') as FormArray;
      control.push(this.addAssesment());
      this.lastAssesmentFormNo = this.lastAssesmentFormNo + 1; 
      this.setDefault();
    }
  }

  setDefault(){
    this.isAssesmentDetailFormVisible = '';
    this.isSimpleVisible = true;
    this.isComparisonVisible = false;
    this.isErrorVisible = false;
    this.isDifferenceVisible = false;
    this.isReferenceRegionVisible = false;
    this.measurementsType = "no";
  }

  changeAssesmentType(event:any, index:any){     // changes occur when assesment type change
    this.UnitOfAssesmentType = event;  
    this.getUnitOfAssesmentType[index] = this.assesmentDetailsUnitArray.filter(items => {
        return items.name == this.UnitOfAssesmentType
    });
    this.measurementDefault[index]= ["simple"];
  }

  changeAssesmentUnit(event:any,category:any,assesment:any){    //change in validation of range when unit change
    let arrayOfCategory = (<FormArray>this.form.controls['categoryArray']).at(category).get('assesmentArray') as FormArray;
    let arrayOfAssesment = <FormGroup>arrayOfCategory.at(assesment);
    this.Unit = event;
    if (event === 'Milimeter') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(1),Validators.max(10000)]);
      arrayOfAssesment.controls["assesmentDetailsRangeFrom"].setValidators([Validators.required,Validators.min(1),Validators.max(10000)]);
      this.valueOfRange="10000";
    }
    else if (event  === 'Number') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(1),Validators.max(9999)]);
      arrayOfAssesment.controls["assesmentDetailsRangeFrom"].setValidators([Validators.required,Validators.min(1),Validators.max(9999)]);
      this.valueOfRange="9999";
    }
    else if (event  === 'Celcius') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(1),Validators.max(50)]);
      arrayOfAssesment.controls["assesmentDetailsRangeFrom"].setValidators([Validators.required,Validators.min(1),Validators.max(50)]);
      this.valueOfRange="50";
    }
    else if (event  === 'Degree') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(1),Validators.max(360)]);
      arrayOfAssesment.controls["assesmentDetailsRangeFrom"].setValidators([Validators.required,Validators.min(1),Validators.max(360)]);
      this.valueOfRange="360";
    }
  }

  changeRangeValidator(event:any,category:any,assesment:any){  //change range validator according to rangeFrom value
    let val = event.target.value;
    let arrayOfCategory = (<FormArray>this.form.controls['categoryArray']).at(category).get('assesmentArray') as FormArray;
    let arrayOfAssesment = <FormGroup>arrayOfCategory.at(assesment);
    let type = arrayOfAssesment.controls["assesmentDetailsUnit"].value;
    if (type === 'Milimeter') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(val),Validators.max(10000)]);
      this.valueOfRange="10000";
    }
    else if (type  === 'Number') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(val),Validators.max(9999)]);
      this.valueOfRange="9999";
    }
    else if (type  === 'Celcius') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(val),Validators.max(50)]);
      this.valueOfRange="50";
    }
    else if (type  === 'Degree') {
      arrayOfAssesment.controls["assesmentDetailsRangeTo"].setValidators([Validators.required,Validators.min(val),Validators.max(360)]);
      this.valueOfRange="360";
    }
  }

  sideComparison(event:any,index:any){     //make changes when side comparison value change
    if(event.checked){
      this.isReferenceRegionVisible = true;
      this.measurementsType="yes";
      this.isSideComparisonChecked[index] = "yes";
    }
    else{
      this.isReferenceRegionVisible = false;
      this.measurementsType="no";
      this.isSideComparisonChecked[index] = "no";
    }
  }

  get getMeasurements() {                // function for set measurement value according to changes in side comparison
    if(this.measurementsType == "yes"){
      return this.measurementsArray;
    }
    else {
      return this.measurementsArray.filter(items => {
        return items.sc == this.measurementsType
      })
    }
  }

  selectMeasurement(event:any,index:any){   // hide and show for measurement option value according to change in Measurements
    this.measurementDefault[index] = event;
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
    this.dataOfGraph(index);
  }

  changeInSimple(event:any){       // hide and show of between input field according to goals option
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

  simpleChange(event:any,index:any){                   // set dataset for chart when value change
    this.chartDataOfSimple[index]= this.dataOfSimple.filter(item =>{
      return item > event.target.value
    });
    this.dataOfGraph(index);
  }

  errorChange(event:any,index:any){
    this.chartDataOfError[index]= this.dataOfError.filter(item =>{
      return item > event.target.value
    });
    this.dataOfGraph(index);
  }

  differenceChange(event:any,index:any){
    this.chartDataOfDifference[index]= this.dataOfDifference.filter(item =>{
      return item > event.target.value
    });
    this.dataOfGraph(index);
  }

  comparisonChange(event:any,index:any){
    this.chartDataOfComparison[index]= this.dataOfComparison.filter(item =>{
      return item > event.target.value
    });
    this.dataOfGraph(index);
  }

  routineChange(event:any,index:any){   // change in selection field of routine week according to option selected
    if(event == "daily"){
      this.selectedDays[index]= this.week;
    }
    else{
      this.selectedDays[index]=[];
    }
  }

  dataOfGraph(index:any){             // set dataset for chart 
    this.dataset[index]=[];
    if(this.isSimpleVisible && this.chartDataOfSimple[index]){
      this.dataset[index].push({
        label: "simple",
        borderColor: 'rgba(75,192,192,1)',
        data: this.chartDataOfSimple[index]
      });
    }
    if(this.isErrorVisible && this.chartDataOfError[index]){
      this.dataset[index].push({
        label: "Error",
        borderColor: 'rgba(75,92,12,1)',
        data: this.chartDataOfError[index]
      });
    }
    if(this.isDifferenceVisible && this.chartDataOfDifference[index]){
      this.dataset[index].push({
        label: "Difference",
        borderColor: 'rgba(184,55,55)',
        data: this.chartDataOfDifference[index]
      });
    }
    if(this.isComparisonVisible && this.chartDataOfComparison[index]){
      this.dataset[index].push({
        label: "Comparison",
        borderColor: 'rgba(45,302,92,1)',
        data: this.chartDataOfComparison[index]
      });
    }
    this.getGraph(this.dataset[index]);    
  }

  getGraph(setOfdata:any) {                    // chart function
    if(this.lineChart){
      this.lineChart.destroy();
    }
    setTimeout(()=>
      this.lineChart = new Chart(this.chart.nativeElement, {
        type: 'line',
        data: {
          labels: ['Mo','Tu','We','Th','Fr','Sa','Su'],
          datasets: setOfdata,
        }
      }),500
    );
  }

  inAssesment(index:any){                // set times value and index for assesment
    this.isAssesmentFormVisible = 'c'+index;
    let array = (<FormArray>this.form.controls['measurementArray']);
    for(let time of array.value){
      this.timeArray.push(time);
    }
  }

  inAssesmentDetail(index:any, category:any, assesment:any){  // set index value for assesment detail form or set value of old assesment detail form on assesment detail click
    if(this.getUnitOfAssesmentType[assesment]){
      this.validatorOfForm();
      if(this.isNextFormVisible){
        this.isAssesmentDetailFormVisible = index;
        let event = this.measurementDefault[assesment];
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
        if(this.isSideComparisonChecked[assesment] == "yes"){
          this.isChecked = true;
          this.isReferenceRegionVisible = true;
          this.measurementsType = "yes";
        }
        else{
          this.isChecked = false;
          this.isReferenceRegionVisible = false;
          this.measurementsType = "no";
        }
        this.dataOfGraph(assesment);
        this.currentCategoryFormNo = category;
        this.currentAssesmentFormNo = assesment;
      }
    }
    else{
      if(this.lastCategoryFormNo === category && this.lastAssesmentFormNo === assesment){
        this.isAssesmentDetailFormVisible = index;
        this.currentCategoryFormNo = category;
        this.currentAssesmentFormNo = assesment;
      }
    }
  }

  validatorOfForm(){   // validation of assesment detail form
    let arrayOfCategory = (<FormArray>this.form.controls['categoryArray']).at(this.currentCategoryFormNo).get('assesmentArray') as FormArray;
    let arrayOfAssesment = <FormGroup>arrayOfCategory.at(this.currentAssesmentFormNo);
    if(arrayOfAssesment.controls['assesmentDetailsType'].valid && arrayOfAssesment.controls['assesmentDetailsRangeFrom'].valid && arrayOfAssesment.controls['assesmentDetailsRangeTo'].valid && arrayOfAssesment.controls['assesmentDetailsMeasuringRegion'].valid && arrayOfAssesment.controls['assesmentDetailsDescription'].valid && arrayOfAssesment.controls['assesmentDetailsRoutine'].valid && arrayOfAssesment.controls['assesmentDetailsMeasurements'].valid){
      if(this.isSimpleVisible && arrayOfAssesment.controls['valueOfSimple'].invalid){
        this.isNextFormVisible= false;
      }
      else if(this.isErrorVisible && arrayOfAssesment.controls['valueOfError'].invalid){
        this.isNextFormVisible= false;
      }
      else if(this.isDifferenceVisible && arrayOfAssesment.controls['valueOfDifference'].invalid){
        this.isNextFormVisible= false;
      }
      else if(this.isComparisonVisible && arrayOfAssesment.controls['valueOfComparison'].invalid){
        this.isNextFormVisible= false;
      }
      else if(this.isReferenceRegionVisible && arrayOfAssesment.controls['assesmentDetailsReferenceRegion'].invalid){
        this.isNextFormVisible= false;
      }
      else if(arrayOfAssesment.controls['assesmentDetailsRangeFrom'].value > arrayOfAssesment.controls['assesmentDetailsRangeTo'].value){
        this.isNextFormVisible= false;
      }
      else{
        this.isNextFormVisible= true;
      }
    }
    else{
      this.isNextFormVisible= false;
    }
  }

  save(){                // display data and clear form
    this.validatorOfForm();
    if(this.isNextFormVisible){
      if(this.form.controls['name'].valid && this.form.controls['bodyRegion'].valid && this.form.controls['description'].valid){
        console.log(this.form.value);
        this.form.reset();
        this.isAssesmentDetailFormVisible='';
        this.isAssesmentFormVisible= '';
        this.createForm();
      }
    }
  }
}
