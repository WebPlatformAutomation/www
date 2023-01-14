Feature: Page function tests
  Feature under test: gnav

  @MWPW-1001
  Scenario Outline: Verify Gnav header and footer
    Given I go to this page <Page>
     Then I should see the header and footer

  Examples:
    | Page     |
    | /        |
    | /contact |

  @MWPW-1002
  Scenario Outline: Verify Gnav applauncher
    Given I go to this page <Page>
     When I sign in
     Then I should see the app launcher

  Examples:
    | Page |
    | /    |