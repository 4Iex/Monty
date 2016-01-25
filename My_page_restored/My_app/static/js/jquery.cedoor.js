/*
 *  Copyright (c) 2015 Omar Desogus
 *  https://github.com/cedoor/HtmlWritingTool
 *
 *  The MIT License (MIT)
 *  http://www.opensource.org/licenses/MIT
 */

$(function() {
    lodmyLib.init();
});

    var lodmyLib = {
        init : function() {
            // DOM elements
            var $navBtns = $('.navOptions');
            var $myprofileBtnParent = $('#myprofileBtn').parent();
            var $page = $('#page');
            var $myprofileBtn = $('#myprofileBtn');
            var $archiveBtn = $('#archiveBtn');
            var $myprojectsBtn = $('#myprojectsBtn');
            var $contactsBtn = $('#contactmeBtn');
            var $loading = $('#loading');

            var initLib = {
                init : function() {

                    $myprofileBtnParent.css({ 'background-color' : '#e6e6e6' });

                    $navBtns.click(function(){
                        $navBtns.parent().css({ 'background-color' : 'transparent' });
                        $(this).parent().css({ 'background-color' : '#e6e6e6' });
                    });

                    $myprofileBtn.click(function(){
                        initLib.fadePages('contents/myprofile.php','profile');
                    });

                    $archiveBtn.click(function(){
                        initLib.fadePages('contents/blog.php','blog');
                    });

                    $myprojectsBtn.click(function(){
                        initLib.fadePages('contents/myprojects.php','projects');
                    });

                    $contactsBtn.click(function(){
                        initLib.fadePages('contents/contactme.php','contactme');
                    });
                },
                fadePages : function(nameOfFile,page) {
                    $page.fadeOut(100, function(){
                        $loading.fadeIn(100);
                        $(this).load(nameOfFile, function() {
                            $loading.fadeOut(100);
                            $(this).fadeIn(100);
                            switch(page) {
                                case 'blog' :
                                    lodmyLib.blog.library();
                                    lodmyLib.blog.events();
                                    break;
                                case 'contactme':
                                    lodmyLib.contactme();
                                    break;
                            }
                        });
                    });
                }
            };
            initLib.init();
        },
        blog : {
            library : function() {
                // DOM elements
                var $documents = $('#documents');
                var $roots = $('.roots');
                var $linux = $('.linux');
                var $btrfLinux = $('#btrfLinux');
                var $linuxFld = $('#linuxFld');
                var $library = $('#archive');
                var $events = $('#events');

                var libraryLib = {
                    init : function() {
                        // Assign to library box height the height's value of events box
                        $library.css({ 'height' : ($events.height()-10)+'px' });
                        // Linux folders
                        $linuxFld.click(function(){ libraryLib.fadeFolders($roots,$linux); });
                        $btrfLinux.click(function(){ libraryLib.fadeFolders($linux,$roots); });
                    },
                    fadeFolders : function(elOut,elIn) {
                        elOut.fadeOut('fast',function(){
                            elIn.fadeIn('fast');
                        });
                    },
                    openDocument : function(btn,fileLocation) {
                        $documents.load(fileLocation, function(){

                            var documentsCode = '<img id="documentsExit" src="images/exit.png">'+
                                                '<p id="documentsTitle" class="h15">Title<p>';

                            $(this).prepend(documentsCode).fadeIn('slow');

                            // To take the Title of document
                            $('#documentsTitle').text(btn.children('p').text());

                            // To exit from documents
                            $('#documentsExit').click(function(){
                                $documents.fadeOut('slow');
                            });
                        });
                    }
                };
                libraryLib.init();
            },
            events : function() {
                var $evInfoSlide = $('.evInfoSlide');
                $evInfoSlide.delay(500).fadeIn(500);
            }
        },
        contactme : function() {
            // DOM elements
            var $allContactFields = $('input, textarea');
            var $contactSubmit = $('#contactSubmit');
            var $contactForm = $('#contactForm');
            var $first_name = $('input[name="first_name"]');
            var $last_name = $('input[name="last_name"]');
            var $email = $('input[name="email"]');
            var $comments = $('textarea[name="comments"]');
            var $contactWarning = $('#contactWarning');

            // Css
            var warningCssOff = { border : '1px solid #bfbfbf' };
            var warningCssOn = { border : '1px solid #824D4D' };

            var contactmeLib = {
                init : function() {
                    $contactSubmit.click(function(e){
                        e.preventDefault();
                        if($first_name.val() === '') contactmeLib.warning('Write the first name',$first_name);
                        else if($last_name.val() === '') contactmeLib.warning('Write the last name',$last_name);
                        else if($email.val() === '') contactmeLib.warning('Write the email address',$email);
                        else if(!contactmeLib.emailCheck($email.val()));
                        else if($comments.val() === '') contactmeLib.warning('Write the comments',$comments);
                        else {
                            contactmeLib.warning('The message was sent', null);
                            setTimeout(function() {
                                $contactForm.submit();
                            },2000);
                        }
                    });

                    $(document).click( function(e){
                        if ( $(e.target).closest('#contactSubmit').length === 0 ) {
                            $contactWarning.fadeOut('fast');
                            $allContactFields.css(warningCssOff);
                        }
                    });

                    $allContactFields.blur(function(){
                        $(this).css(warningCssOff);
                    });
                },
                warning : function(message,cssWarning) {
                    $contactWarning.fadeOut('fast', function(){
                        $(this).children('span').text(message);
                    }).fadeIn('fast');
                    $allContactFields.css(warningCssOff);
                    if(cssWarning !== null) cssWarning.css(warningCssOn);
                    else {
                        $contactWarning.children('img').attr('src','images/checked.gif')
                    }
                },
                emailCheck: function(emailStr) {
                    var emailPat = /^(.+)@(.+)$/;
                    var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
                    var validChars = "[^\\s" + specialChars + "]";
                    var quotedUser = "(\"[^\"]*\")";
                    var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
                    var atom = validChars + "+";
                    var word = "(" + atom + "|" + quotedUser + ")";
                    var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
                    var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
                    var matchArray = emailStr.match(emailPat);
                    if (matchArray === null) {
                        contactmeLib.warning("Email incorrect",$email);
                        return false;
                    }
                    var user = matchArray[1];
                    var domain = matchArray[2];
                    if (user.match(userPat) === null) {
                        contactmeLib.warning("Email incorrect",$email);
                        return false;
                    }
                    var IPArray = domain.match(ipDomainPat);
                    if (IPArray !== null) {
                        for (var i = 1; i <= 4; i++) {
                            if (IPArray[i] > 255) {
                                contactmeLib.warning("Email incorrect",$email);
                                return false;
                            }
                        }
                        return true;
                    }
                    var domainArray = domain.match(domainPat);
                    if (domainArray === null) {
                        contactmeLib.warning("Email incorrect",$email);
                        return false;
                    }
                    var atomPat = new RegExp(atom, "g");
                    var domArr = domain.match(atomPat);
                    var len = domArr.length;
                    if (domArr[domArr.length - 1].length < 2 ||
                        domArr[domArr.length - 1].length > 6) {
                        contactmeLib.warning("Email incorrect",$email);
                        return false;
                    }
                    if (len < 2) {
                        contactmeLib.warning("Email incorrect",$email);
                        return false;
                    }
                    return true;
                }
            };
            contactmeLib.init();
        }
    };






