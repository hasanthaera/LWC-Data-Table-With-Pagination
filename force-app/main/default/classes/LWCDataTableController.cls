public with sharing class LWCDataTableController {
    @AuraEnabled 
    public static List<Contact> fetchContactData(String pageNumber,String pageSize){
        system.debug('pageNumber --> '+pageNumber);
        system.debug('pageSize --> '+pageSize);
        Integer psize = Integer.valueOf(pageSize);
        Integer pnumber = Integer.valueOf(pageNumber)-1;
        system.debug('psize------->'+psize);
         system.debug('pnumber------->'+pnumber);
         system.debug('pnumber 1------->'+(psize*pnumber));
         List<Contact> ContactList = New List<Contact>();
                ContactList = [SELECT Name,Phone,Email FROM Contact LIMIT: psize OFFSET : (psize*pnumber)];
        return ContactList;
    }

    @AuraEnabled
   public static Integer getContactCount() {  
     String query = 'select count() from Contact';
         system.debug('query'+Database.countQuery(query));
     return Database.countQuery(query);  
   } 
}