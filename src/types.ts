export interface Customer {
    id: string; 
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    secureId: string;
    addresses: Address[];
    phones: Phone[];
    emails: Email[];
}

export interface Address {
    id: string;
    type: 'Home' | 'Business' | 'Mailing';

    street: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface Phone {
    id: string;
    type: 'Mobile' | 'Home' | 'Work';
    number: string;
    isPrimary: boolean;
}

export interface Email {
    id: string;
    type: 'Personal' | 'Work';
    address: string;
    isPrimary: boolean;
}