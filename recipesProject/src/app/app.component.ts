import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginCompComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipesProject';
}
