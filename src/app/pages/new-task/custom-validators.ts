import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static uniquePersonNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const people = control.value as { name: string }[];
      const names = people.map(person => person.name);
      const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index && name?.trim() !== '');
      const duplicates = names.filter((name, index) => names.indexOf(name) !== index && name?.trim() !== '');
      return hasDuplicates ? { duplicateNames: true, duplicates: duplicates } : null;
    };
  }

  static atLeastOneSkillValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const people = control.value as { skills: string[] }[];
      const hasNoSkills = people.some(person => !person.skills || person.skills.length === 0 );
      return hasNoSkills ? { noSkills: true, } : null;
    };
  }
}
