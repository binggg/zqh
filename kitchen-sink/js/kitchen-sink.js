var myApp=new Framework7({modalTitle:'Framework7',animateNavBackIcon:true});
var $$=Framework7.$;
var mainView=myApp.addView('.view-main',{dynamicNavbar:true});
var rightView=myApp.addView('.view-right',{dynamicNavbar:true});
$$(document).on('ajaxStart', function() {
  myApp.showIndicator();
});

$$(document).on('ajaxComplete', function() {
  myApp.hideIndicator();
});

var photoBrowserPhotos=['img/beach.jpg','http://placekitten.com/1024/1024','img/lock.jpg','img/monkey.jpg','img/mountains.jpg'];
var photoBrowserStandalone=myApp.photoBrowser({photos:photoBrowserPhotos});
var photoBrowserPopup=myApp.photoBrowser({photos:photoBrowserPhotos,type:'popup'});
var photoBrowserPage=myApp.photoBrowser({photos:photoBrowserPhotos,type:'page',backLinkText:'Back'});
var photoBrowserDark=myApp.photoBrowser({photos:photoBrowserPhotos,theme:'dark'});
var photoBrowserPopupDark=myApp.photoBrowser({photos:photoBrowserPhotos,theme:'dark',type:'popup'});
$$(document).on('pageInit', function(e) {
  var page=e.detail.page;
  if(page.name==='modals') {
    $$('.demo-alert').on('click', function() {
      myApp.alert('Hello!');
    });

    $$('.demo-confirm').on('click', function() {
      myApp.confirm('Are you feel good today?', function() {
        myApp.alert('Great!');
      });

    });

    $$('.demo-prompt').on('click', function() {
      myApp.prompt('What is your name?', function(data) {
        myApp.confirm('Are you sure that your name is '+ data+'?', function() {
          myApp.alert('Ok, your name is '+ data+' ;)');
        });

      });

    });

  }
  if(page.name==='preloader') {
    $$('.demo-indicator').on('click', function() {
      myApp.showIndicator();
      setTimeout( function() {
        myApp.hideIndicator();
      },2000);

    });

    $$('.demo-preloader').on('click', function() {
      myApp.showPreloader();
      setTimeout( function() {
        myApp.hidePreloader();
      },2000);

    });

    $$('.demo-preloader-custom').on('click', function() {
      myApp.showPreloader('My text...');
      setTimeout( function() {
        myApp.hidePreloader();
      },2000);

    });

  }
  if(page.name==='swipe-delete') {
    $$('.demo-remove-callback').on('deleted', function() {
      myApp.alert('Thanks, item removed!');
    });

  }
  if(page.name==='swipe-delete'||page.name==='modals'||page.name==='media-lists') {
    $$('.demo-actions').on('click', function() {
      myApp.actions([[{text:'Here comes some optional description or warning for actions below',label:true},{text:'Alert',onClick: function() {
          myApp.alert('He Hoou!');
        }},{text:'Nice Red Button ',red:true,onClick: function() {
          myApp.alert('You have clicked red button!');
        }},],[{text:'Cancel',bold:true}]]);
    });

  }
  if(page.name==='messages') {
    var conversationStarted=false;
    var answers=['Yes!','No','Hm...','I am not sure','And what about you?','May be ;)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus tincidunt erat, a convallis leo rhoncus vitae.'];
    var answerTimeout;
    $$('.ks-messages-form').on('submit', function(e) {
      e.preventDefault();
      var input=$$(this).find('.ks-messages-input');
      var messageText=input.val();
      if(messageText.length===0)
        return;
      input.val('');
      myApp.addMessage({text:messageText,type:'sent',day:!conversationStarted?'Today':false,time:!conversationStarted?(new Date()).getHours()+':'+(new Date()).getMinutes():false});
      conversationStarted=true;
      if(answerTimeout)
        clearTimeout(answerTimeout);
      answerTimeout=setTimeout( function() {
        myApp.addMessage({text:answers[Math.floor(Math.random()*answers.length)],type:'received'});
      },2000);

    });

    $$('.ks-send-message').on('click', function() {
      $$('.ks-messages-form').trigger('submit');
    });

  }
  if(page.name==='pull-to-refresh') {
    var songs=['Yellow Submarine','Don\'t Stop Me Now','Billie Jean','Californication'];
    var authors=['Beatles','Queen','Michael Jackson','Red Hot Chili Peppers'];
    var ptrContent=$$(page.container).find('.pull-to-refresh-content');
    ptrContent.on('refresh', function(e) {
      setTimeout( function() {
        var picURL='http://hhhhold.com/88/d/jpg?'+ Math.round(Math.random()*100);
        var song=songs[Math.floor(Math.random()*songs.length)];
        var author=authors[Math.floor(Math.random()*authors.length)];
        var linkHTML='<li class="item-content">'+'<div class="item-media"><img src="'+ picURL+'" width="44"/></div>'+'<div class="item-inner">'+'<div class="item-title-row">'+'<div class="item-title">'+ song+'</div>'+'</div>'+'<div class="item-subtitle">'+ author+'</div>'+'</div>'+'</li>';
        ptrContent.find('ul').prepend(linkHTML);
        myApp.pullToRefreshDone();
      },2000);

    });

  }
  if(page.name==='sortable-list') {
    $$('.list-block.sortable').on('open', function() {
      $$('.toggle-sortable').text('Done');
    });

    $$('.list-block.sortable').on('close', function() {
      $$('.toggle-sortable').text('Edit');
    });

  }
  if(page.name==='photo-browser') {
    $$('.ks-pb-standalone').on('click', function() {
      photoBrowserStandalone.open();
    });

    $$('.ks-pb-popup').on('click', function() {
      photoBrowserPopup.open();
    });

    $$('.ks-pb-page').on('click', function() {
      photoBrowserPage.open();
    });

    $$('.ks-pb-popup-dark').on('click', function() {
      photoBrowserPopupDark.open();
    });

    $$('.ks-pb-standalone-dark').on('click', function() {
      photoBrowserDark.open();
    });

  }
  if(page.name==='infinite-scroll') {
    var loading=false;
    var lastLoadedIndex=$$('.infinite-scroll .list-block li').length;
    $$('.infinite-scroll').on('infinite', function() {
      if(loading)
        return;
      loading=true;
      $$.get('infinite-scroll-load.php',{leftIndex:lastLoadedIndex+ 1}, function(data) {
        loading=false;
        if(data==='') {
          myApp.detachInfiniteScroll($$('.infinite-scroll'));
        } else {
          $$('.infinite-scroll .list-block ul').append(data);
          lastLoadedIndex=$$('.infinite-scroll .list-block li').length;
        }
      });

    });

  }
  if(page.name==='notifications') {
    $$('.ks-notification-simple').on('click', function() {
      myApp.addNotification({title:'Framework7',message:'This is a simple notification message with title and message'});
    });

    $$('.ks-notification-full').on('click', function() {
      myApp.addNotification({title:'Framework7',subtitle:'Notification subtitle',message:'This is a simple notification message with custom icon and subtitle',media:'<i class="icon icon-f7"></i>'});
    });

    $$('.ks-notification-custom').on('click', function() {
      myApp.addNotification({title:'My Awesome App',subtitle:'New message from John Doe',message:'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',media:'<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">'});
    });

    $$('.ks-notification-callback').on('click', function() {
      myApp.addNotification({title:'My Awesome App',subtitle:'New message from John Doe',message:'Hello, how are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed molestie risus, quis tincidunt dui.',media:'<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">',onClose: function() {
          myApp.alert('Notification closed');
        }});

    });

  }
});

$$('.popover a').on('click', function() {
  myApp.closeModal('.popover');
});

$$('.panel-left').on('open', function() {
  $$('.statusbar-overlay').addClass('with-panel-left');
});

$$('.panel-right').on('open', function() {
  $$('.statusbar-overlay').addClass('with-panel-right');
});

$$('.panel-left, .panel-right').on('close', function() {
  $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

var dynamicPageIndex=0;
function createContentPage() {
  mainView.loadContent('<!-- Top Navbar-->'+'<div class="navbar">'+'  <div class="navbar-inner">'+'    <div class="left"><a href="#" class="back link">Back</a></div>'+'    <div class="center sliding">Dynamic Page '+(++dynamicPageIndex)+'</div>'+'  </div>'+'</div>'+'<div class="pages">'+'  <!-- Page, data-page contains page name-->'+'  <div data-page="dynamic-content" class="page">'+'    <!-- Scrollable page content-->'+'    <div class="page-content">'+'      <div class="content-block">'+'        <div class="content-block-inner">'+'          <p>Here is a dynamic page created on '+ new Date()+' !</p>'+'          <p>Go <a href="#" class="back">back</a> or generate <a href="#" class="ks-generate-page">one more page</a>.</p>'+'        </div>'+'      </div>'+'    </div>'+'  </div>'+'</div>');
  return;
}

$$(document).on('click','.ks-generate-page',createContentPage);