import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Person } from '../../interfaces/Person';
import {  Task } from '../../interfaces/task';
import { CustomValidators } from './custom-validators';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent implements OnInit {
  taskForm: FormGroup;
  fb = inject(FormBuilder);
  taskService = inject(TaskService);
  router = inject(Router);
  constructor() {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      completed: [false],
      people: this.fb.array<Person>(
        [],
        [
          Validators.required,
          CustomValidators.uniquePersonNameValidator(),
          CustomValidators.atLeastOneSkillValidator(),
        ]
      ),
    });
  }

  ngOnInit(): void {}

  newPerson(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\\s]+$')]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array<string>([]),
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    this.people.push(this.newPerson());
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: ['', Validators.required],
    });
  }

  addSkill(personIndex: number) {
    this.getSkills(personIndex).push(this.newSkill());
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const { name, date, people } = this.taskForm.value;
      let temp: Person[] = [];

      for (const person of people) {
        const skills: string[] = person.skills.map((skill: Record<string,string>) => skill['skill'])
        temp.push({
          name: person.name,
          age: person.age,
          skills: skills,
        });
      }

      const task: Task = {
        id: this.taskService.lastId() + 1,
        userId: 10,
        name: name,
        date: date,
        completed: false,
        people: temp,
      };
      this.taskService.addTask(task);
      this.taskForm.reset();
      this.router.navigate(['']);
    }
  }
}
