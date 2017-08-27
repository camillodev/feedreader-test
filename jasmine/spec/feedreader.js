/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('all feeds should have a URL defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url).not.toBe('');
            });
        });

        it('all feeds should have a name defined and not empty', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function(){
        it('menu should is hidden by default', function(){   
            expect($("body").hasClass('menu-hidden')).toBe(true);            
        });

         it('menu should is change his visibility when its clicked', function(){
            var menuIcon = $('.menu-icon-link');
          
            // menu should shows since it starts hidden
            menuIcon.click(); 
            expect($("body").hasClass('menu-hidden')).toBe(false);  

            // menu should hide      
            menuIcon.click(); 
            expect($("body").hasClass('menu-hidden')).toBe(true);             
        });
    });

    describe("Initial Entries", function(){
        beforeEach(function(done){
            debugger;
            loadFeed(0,done);
        })
        it('should have at least a single entry element when loadFeed completes to load', function(done){
            var entries = $('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe("New Feed Selection", function() {
        var oldFirstEntryHeading;
        // Reset feed to 0 before all tests begin
        beforeAll(function(done) {
            loadFeed(0, function(){              
                oldFirstEntryHeading = $('.feed .entry > h2').first().text();
                done();
            });
        });

        beforeEach(function(done) {
            loadFeed(2, done);
        });

        it("should change content when a new feed is loaded", function() {
            var newFirstEntryHeading = $('.feed .entry > h2').first().text();
            expect( newFirstEntryHeading ).not.toBe( oldFirstEntryHeading );
        });
    });
}());
