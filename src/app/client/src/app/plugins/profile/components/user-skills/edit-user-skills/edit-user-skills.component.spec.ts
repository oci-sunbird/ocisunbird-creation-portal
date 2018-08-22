
import {of as observableOf,  Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './../../../services';
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService, CoreModule } from '@sunbird/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TelemetryService } from '@sunbird/telemetry';

import {
  ResourceService, ConfigService, IUserProfile, IUserData, ToasterService, SharedModule,
  WindowScrollService
} from '@sunbird/shared';
import { EditUserSkillsComponent } from './edit-user-skills.component';
import { mockRes } from './edit-user-skills.component.spec.data';
import { Ng2IzitoastService } from 'ng2-izitoast';

describe('EditUserSkillsComponent', () => {
  let component: EditUserSkillsComponent;
  let fixture: ComponentFixture<EditUserSkillsComponent>;
  const fakeActivatedRoute = {
    'params': observableOf({ 'section': 'skills', 'action': 'add' })
  };
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserSkillsComponent],
      imports: [FormsModule, ReactiveFormsModule, SuiModule, HttpClientTestingModule, SharedModule.forRoot(), CoreModule.forRoot()],
      providers: [ResourceService, UserService, ProfileService, Ng2IzitoastService, ToasterService,
        WindowScrollService, TelemetryService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSkillsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    const userService = TestBed.get(UserService);
    const offsetTop = 'skills';
    userService._userProfile = mockRes.data.userProfile;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('should call addSkill method', fakeAsync(() => {
    const userService = TestBed.get(UserService);
    const toasterService = TestBed.get(ToasterService);
    const resourceService = TestBed.get(ResourceService);
    resourceService.messages = mockRes.resourceBundle.messages;
    const profileService = TestBed.get(ProfileService);
    const router = TestBed.get(Router);
    userService._userProfile = mockRes.data.userProfile;
    resourceService.frmelmnts = mockRes.resourceBundle.frmelmnts;
    spyOn(profileService, 'getSkills').and.callFake(() => observableOf(mockRes.getSkillsData));
    spyOn(profileService, 'add').and.callFake(() => observableOf(mockRes.response));
    spyOn(toasterService, 'success');
    component.addSkill();
    fixture.detectChanges();
    expect(profileService.add).toHaveBeenCalled();
  }));

  it('should call redirect method', () => {
    const router = TestBed.get(Router);
    component.redirect();
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
