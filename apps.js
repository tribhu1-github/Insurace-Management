import { LightningElement } from 'lwc';
import { track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import Name from '@salesforce/schema/User.Name';
import searchApplicant from '@salesforce/apex/ApexClassForLWC.searchApplicant';


export default class Apps extends LightningElement {
 objApplicant = {'sObjectType' : 'Applicant_Details__c'};
    appList;
    showTable;
    @track fromDate;
    @track toDate;
    userName;
    userDetail;
    draftValues=[];
    @track recordId;

    
    appColumns = [
        {label : ' Id',         fieldName : 'Id' },
        {label : 'FirstName',   fieldName : 'First_Name__c'},
        {label : 'LastName',    fieldName : 'Last_Name__c'},
        {label : 'Email Id',    fieldName : 'Email_ID__c'},
        {label : 'DOB',         fieldName : 'DOB__c'},
        {label : 'Create Date', fieldName : 'CreatedDate'}
    ];
    
    currentUserId = Id;
    @wire(getRecord, {recordId:Id, fields:[Name]})
    userDetail({error, data}){
        if(data){
            this.userName = data.fields.Name.value;
        } 
    }
    
    fromDateHandler(event){
        this.fromDate = event.target.value; 
        console.log('Handler Called'+this.fromDate);
    }

    toDateHandler(event){
        this.toDate = event.target.value;
         console.log('Handler Called'+this.toDate);
    }

    searchButtonHandler(){
        searchApplicant({'fromdate' : this.fromDate, 'todate' : this.toDate})
        .then(result=>{
            this.showTable = true;
            console.log(result);
            this.appList = result;
        })
        .catch(error=>{
            console.log(error);
        })
    }

    closeButtonHandler(){
        this.showTable = false;
    }

}