/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectToGridComponent } from './select-to-grid.component';

describe('SelectToGridComponent', () => {
  let component: SelectToGridComponent;
  let fixture: ComponentFixture<SelectToGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectToGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectToGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
