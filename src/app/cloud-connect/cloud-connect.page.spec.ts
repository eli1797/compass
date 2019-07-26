import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudConnectPage } from './cloud-connect.page';

describe('CloudConnectPage', () => {
  let component: CloudConnectPage;
  let fixture: ComponentFixture<CloudConnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudConnectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
