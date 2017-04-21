import {Component, View, AfterViewChecked, ElementRef, ViewChild, OnInit} from 'angular2/core';
import {Angular2AutoScroll} from "angular2-auto-scroll/lib/angular2-auto-scroll.directive";
import {ChatService} from './chat.service';
import {Router} from 'angular2/router';
import {Profile}   from '../profile/profile.component';
import {ProfileService}   from '../profile/profile.service';
// We `import` `http` into our `ChatService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from 'angular2/http';

// Import NgFor directive
import {NgFor} from 'angular2/common';


// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'chat',
    // Let Angular 2 know about `Http` and `ChatService`
    providers: [...HTTP_PROVIDERS, ChatService, Profile,ProfileService],
    template: require('./chat.html'),
    directives: [Angular2AutoScroll]
})


export class Chat implements OnInit, AfterViewChecked{
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    private header_button = 1;
    private url = 'http://localhost:8080';
    private socket;
  // Initialize our `chatData.text` to an empty `string`
  chatData = {
    text: '',
    name: '',
    date: ''
  };

  private chats: Array<Chat> = [];
  private check_chat: number = 0;
  private submit_name: number= 0;
  private length_check: number = 0;
  constructor(private router: Router, public ChatService: ChatService, public profile: Profile) {

      console.log('Chat constructor go!');
      if (localStorage.getItem('token')) {

          this.chatData.name = JSON.parse(localStorage.getItem('token')).local.name;
      } else {
          router.navigate(['Index']);
      }
     
      //this.chats = [];
      ChatService.getAll()
      // `Rxjs`; we subscribe to the response
          .subscribe((res) => {

              // Populate our `todo` array with the `response` data
              this.chats = res;
              this.length_check = this.chats.length;
              // Reset `todo` input
              this.chatData.text = '';
          });

     
      let t = setInterval(() => {


          if(window.location.hash === "#/chat"){
          ChatService.getAll()
          // `Rxjs`; we subscribe to the response
              .subscribe((res) => {
                  // Populate our `todo` array with the `response` data
                  if (this.length_check < res.length){
                      this.chats = res;
                      this.length_check = res.length;
                  }
             
                  // Reset `todo` input
              });}else{

               clearInterval(t);
           }

      }, 1000);
      
  }

    ngOnInit() {
        this.scrollToBottom();
    }

     ngAfterViewChecked() {
        if(this.chats.length > this.check_chat) {
            this.scrollToBottom();
            this.check_chat = this.chats.length;
        }
     }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }

  createChat() {
      this.chatData.date = (new Date()).toString().split('G')[0];

      this.ChatService.createChat(this.chatData)
        .subscribe((res) => {

            // Populate our `todo` array with the `response` data
            this.chats = res;
            // Reset `todo` input
            this.chatData.text = '';
        });
  }

  deleteChat(id) {

    this.ChatService.deleteChat(id)
      .subscribe((res) => {

          // Populate our `todo` array with the `response` data
          this.chats = res;
      });
  }

  refresh(){
      
      this.ChatService.getAll()
          .subscribe((res) => {

              // Populate our `todo` array with the `response` data
              this.chats = res;
              // Reset `todo` input
              this.chatData.text = '';
      });
  }
}
