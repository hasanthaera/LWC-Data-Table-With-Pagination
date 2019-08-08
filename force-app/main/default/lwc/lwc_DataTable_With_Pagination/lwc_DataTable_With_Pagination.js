import {
    LightningElement,
    track,
    wire,
    api
} from 'lwc';
import fetchContactData from '@salesforce/apex/LWCDataTableController.fetchContactData';
import getContactCount from '@salesforce/apex/LWCDataTableController.getContactCount';
const contactColumns = [{
        label: 'Contact Name',
        fieldName: 'Name',
        sortable: true
    },
    {
        label: 'Email',
        fieldName: 'Email',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        sortable: true
    }
];

export default class Lwc_DataTable_With_Pagination extends LightningElement {
    @api recordId;
    @track contactData;
    @api contactColumns = contactColumns;
    @api pagesize;
    @api pageNumber = 1;
    @api currentpage;
    @track count;
    @track totalpages;
    @track totalrecords;

    connectedCallback() {
        this.getContatCount();
    }

    getContatCount() {
        console.log('--> getContatCount --> ');
        this.currentpage = 1;
        this.pagesize = 5;
        this.totalpages = 1;
        getContactCount({})
            .then(countListresult => {
                console.log('recordCount-->  ' + JSON.stringify(countListresult));
                console.log('pagesize-->  ' + this.pagesize);
                this.totalrecords = countListresult;
                this.totalpages = Math.ceil(parseInt(countListresult, 10) / parseInt(this.pagesize, 10));
                this.getContatData(1);
            })
            .catch(error => {
                this.error = error;
                console.log('this.error -->  ' + JSON.stringify(this.error));
            });
    }

    getContatData(pageNumber) {
        console.log('--> getContatData --> ');
        //this.currentpage = 1;
        this.pagesize = 5;
        //this.totalpages = 1;
        console.log('pagesize --> ' + this.pagesize);
        console.log('pageNumber --> ' + pageNumber);
        fetchContactData({
                pageNumber: pageNumber,
                pageSize: this.pagesize
            })
            .then(result => {
                console.log('fetchContactData Result -->  ' + JSON.stringify(result));
                if (result) {
                    this.contactData = result;
                }
            })
            .catch(error => {
                this.error = error;
                console.log('this.error -->  ' + JSON.stringify(this.error));
            });
    }
    handleFirst(event) {
        this.pageNumber = 1;
        this.getContatData(this.pageNumber);
    }
    handleLast(event) {
        this.pageNumber = this.totalpages;
        this.getContatData(this.pageNumber);
    }
    handleNext(event) {
        this.pageNumber = this.pageNumber + 1;
        this.getContatData(this.pageNumber);

    }
    handlePrevious(event) {
        this.pageNumber = this.pageNumber - 1;
        this.getContatData(this.pageNumber);

    }

    get showFirstButton() {
        if (this.pageNumber === 1) {
            return true;
        }
        return false;
    }
    // getter  
    get showLastButton() {
        console.log('totalrecords --> ' + this.totalrecords);
        console.log('pageSize --> ' + this.pagesize);
        console.log('pageNumber --> ' + this.pageNumber);
        if (Math.ceil(this.totalrecords / this.pagesize) === this.pageNumber) {
            return true;
        }
        return false;
    }


}