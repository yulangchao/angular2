import {Component, View} from 'angular2/core';

import {ProfileService} from './profile.service';
import {Router} from 'angular2/router';
// We `import` `http` into our `ProfileService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from 'angular2/http';

// Import NgFor directive
import {NgFor} from 'angular2/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'profile',
    // Let Angular 2 know about `Http` and `ProfileService`
    providers: [...HTTP_PROVIDERS, ProfileService]
})
@View({
    template: require('./profile.html'),
})
export class Profile {

  // Initialize our `profileData.text` to an empty `string`
  profileData = {
    username: '',
    password: '',
    email: ''
  };

  profile = {
      name: '',
      email: '',
      phone: '',
      type: '',
      logo: 0
  };


  private isReadonly: boolean = true;

  constructor(private router: Router, public profileService: ProfileService) {
      console.log('Profile constructor go!');
      if (localStorage.getItem('token')) {
          this.profileData.email = JSON.parse(localStorage.getItem('token')).local.email;
          this.getProfile(this.profileData.email);
          this.profile.email = this.profileData.email;
          this.profile.name = JSON.parse(localStorage.getItem('token')).local.name;
      } else {
          router.navigate(['Index']);
      }


      // //this.profiles = [];
      // profileService.getAll()
      // // `Rxjs`; we subscribe to the response
      //     .subscribe((res) => {
      //
      //         // Populate our `profile` array with the `response` data
      //         this.profiles = res;
      //         // Reset `profile` input
      //         this.profileData.username = '';
      //       this.profileData.password = '';
      //       this.profileData.email = '';
      //     });

  }


  updateProfile() {
      this.profile.logo = Number(this.profile.logo);


      this.profileService.updateProfile(this.profile.email,this.profile)
        .subscribe((res) => {

            // Reset `profile` input
          this.profileData.username = '';
          this.profileData.password = '';
          this.profileData.email = '';
        });
  }
  //
  // deleteProfile(id) {
  //
  //   this.profileService.deleteProfile(id)
  //     .subscribe((res) => {
  //
  //         // Populate our `profile` array with the `response` data
  //         this.profiles = res;
  //     });
  // }

  getProfile(id) {

        this.profileService.getProfile(id)
            .subscribe((res) => {

                // Populate our `profile` array with the `response` data
                this.profile.email = res.email;
                this.profile.name = res.name;
                this.profile.type = res.type;
                this.profile.logo = res.logo;
                this.profile.phone = res.phone;
            });
   }

  refresh(){

      this.profileService.getAll()
          .subscribe((res) => {

              // Populate our `profile` array with the `response` data
              this.profile = res;
              // Reset `profile` input
            this.profileData.username = '';
            this.profileData.password = '';
            this.profileData.email = '';
      });
  }

  reset(st: HTMLInputElement){
      st.value = this.profile.phone;
  }

    reset1(st: HTMLSelectElement){
        st.value = this.profile.logo+"";
    }
}
