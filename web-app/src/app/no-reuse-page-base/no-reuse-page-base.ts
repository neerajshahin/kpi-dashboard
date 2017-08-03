//this compent is used to fix the issue https://github.com/angular/angular/issues/9811
//Related to Router where an click on the active route will not reload the component.
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, UrlSegment} from '@angular/router';


export class NoReusePageBase
{
  constructor(router: Router, route: ActivatedRoute)
  {
      console.log("NoReusePageBase is loaded");
    var subscription = route.url.skip(1).subscribe((url: UrlSegment[]) => {
        console.log("NoReusePageBase forward before");
      subscription.unsubscribe();
      router.navigate(
        ['/forward', { data: encodeURIComponent(JSON.stringify(url.map(v => v.path))) }], 
        { skipLocationChange: true });
    });
  }
}

@Component({
  template: ''
})
export class ForwardPage implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
      console.log("ForwardPage is loaded");
    this.router.navigate(
      JSON.parse(decodeURIComponent(this.route.snapshot.params['data'])), 
      { skipLocationChange: true });
  }
}