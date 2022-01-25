@sky-home-page @ui-tests
Feature: This feature will make sure that the shop page is navigable and usable.
@deals-page
Scenario: User navigates to shop page
Given I am on the home page
When I navigate to '/deals'
Then the user should be on the "https://www.sky.com/deals" page

@sky-create-my-sky-account-page
Scenario: User sees tiles on the shop page
  Given I am on the home page
  When I try to sign in with invalid credentials
  #Then I should see a box with the text 'Create your My Sky password'

@sky-deals-list
Scenario: User sees a list of deals on the deals page
  Given I am on the 'https://www.sky.com/deals' page
   Then I see a list of deals with a price to it
    | Bundle                   |  Text|
    | Ultimate TV              |  £26a month for 18 months|
    | Sky TV & Sky Sports      |  £41a month for 18 months|
    | Sky TV, Netflix & Cinema |  £37a month for 18 months|


