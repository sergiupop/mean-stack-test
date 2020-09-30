import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl = '/api/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Promise<void | Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
               .toPromise()
               .then(response => response as Contact[])
               .catch(this.handleError);
  }

  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.contactsUrl, newContact)
               .toPromise()
               .then(response => response as Contact)
               .catch(this.handleError);
  }

  deleteContact(contactId: String): Promise<void | String> {
    return this.http.delete(this.contactsUrl + '/' + contactId)
               .toPromise()
               .then(response => response as String)
               .catch(this.handleError);
  }

  updateContact(updatedContact: Contact): Promise<void | Contact> {
    const putUrl = this.contactsUrl + '/' + updatedContact._id;

    return this.http.put(putUrl, updatedContact)
               .toPromise()
               .then(response => response as Contact)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
