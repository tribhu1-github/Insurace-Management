import { LightningElement,wire } from 'lwc';
 
import getApplicantsByDateRange from '@salesforce/apex/DemoClass.getApplicantsByDateRange';
export default class NewApplicantComponent extends LightningElement {

 startDate;
    endDate;
    applicants;
    error;
     
 
    columns = [
        { lab8el: 'First_Name', fieldName: 'First_Name__c' },
        { label: 'Email', fieldName: 'Email_ID__c' },
        { label: 'Gender', fieldName: 'Gender__c' },
        { label: 'Phone', fieldName:'Mobile_Number__c'}
        
    ];

    // Handles the start date input change
    handleStartDateChange(event) {
        this.startDate = event.target.value;
    }

    // Handles the end date input change
    handleEndDateChange(event) {
        this.endDate = event.target.value;
    }

    // Handles the search button click
    handleSearch() {
        if (this.startDate && this.endDate) {
            getApplicantsByDateRange({ startDate: this.startDate, endDate: this.endDate })
                .then(result => {
                    this.applicants = result;
                    this.error = undefined;
                   
                })
                .catch(error => {
                    this.error = error.body.message;
                    this.applicants = undefined;
                      
                });
        }
    }
}