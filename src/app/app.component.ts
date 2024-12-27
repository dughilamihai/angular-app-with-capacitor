import { Component } from '@angular/core';
import { Task } from './model/task.model';
import { CommonModule } from '@angular/common';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webNativeApp';
  phoneNumber: string = '123456789';



  tasks: Task[] = [
    {
      id: 1,
      user_id: 11,
      title: 'Task 1',
      description: 'Description for Task 1',
      route: '/tasks',
      datetime: new Date('2024-12-18T10:00:00'),
    },
    {
      id: 2,
      user_id: 12,
      title: 'Task 2',
      description: 'Description for Task 2',
      route: '/accounts',      
      datetime: new Date('2024-12-17T14:00:00'),
    },
    {
      id: 3,
      user_id: 9,      
      title: 'Task 3',
      description: 'Description for Task 3',
      route: '/tasks',      
      datetime: new Date('2024-12-16T08:30:00'),
    },
  ];

  constructor() {
    // Sortează task-urile descrescător după datetime.
    this.tasks.sort((a, b) => b.datetime.getTime() - a.datetime.getTime());
}

ngOnInit() {
  // Solicită permisiunile pentru notificări la inițializarea paginii
  this.requestPermissions();
}

async requestPermissions() {
  const { display } = await LocalNotifications.requestPermissions();
  if (display === 'granted') {
    console.log('Permisiuni pentru notificări acordate.');
  } else {
    console.error('Permisiuni pentru notificări refuzate.');
  }
}  

// Programeaza o notificare
async scheduleNotification() {
  const { display } = await LocalNotifications.requestPermissions();
  if (display === 'granted') {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Notificare locală',
          body: 'Aceasta este o notificare de test.',
          id: 1,
          schedule: { at: new Date(new Date().getTime() + 500) }, // notificare programată pentru 5 secunde
        },
      ],
    });
  } else {
    console.error('Permisiuni pentru notificări refuzate.');
  }
}

openDialer(phoneNumber: string) {
  if (Capacitor.isNativePlatform()) {
    // Deschide dialer-ul pe dispozitive native
    window.location.href = `tel:${phoneNumber}`;
  } else {
    // Funcționează și pe web
    alert(`Pe web, linkul de apel este: tel:${phoneNumber}`);
    window.location.href = `tel:${phoneNumber}`;
  }
}
}