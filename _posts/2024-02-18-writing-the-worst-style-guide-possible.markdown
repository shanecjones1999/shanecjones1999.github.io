---
layout: post
title:  "Writing the Worst Style Guide Possible"
date:   2024-02-18 18:04:00 -0400
categories: jekyll update
---

I thought it would be interesting to see what the worst style guide might look like, and then try to write code following that guide and see what happens.

---
&nbsp;

## Getting a "Control"

First, I need to get a "control" style guide to see how much worse I can do.[^1] So, I commanded ChatGPT for the following:

> Write the worst possible code style guide for a startup company

Here is the response:

"Creating a deliberately bad code style guide is not advisable, as maintaining a clear and consistent coding style is crucial for collaboration and code quality. However, for the sake of humor, here's an exaggerated and impractical example of a misguided code style guide:

**Indentation**: Use a random number of spaces and tabs for indentation within the same file. Bonus points for mixing spaces and tabs on the same line.

**Variable Naming**: Choose variable names that are as ambiguous as possible. Single-letter variable names like "x," "y," and "z" are preferred. Bonus points for using emoji in variable names.

**Comments**: Avoid commenting altogether. Real programmers don't need comments. If you must comment, use all caps and exclamation marks to convey excitement.

**Function Length**: Write functions that are thousands of lines long. Each function should perform multiple unrelated tasks to keep things interesting.

**Use Global Variables Liberally**: Global variables are your best friends. Declare all variables as global for maximum accessibility.

**Code Duplication**: Embrace code duplication as a form of job security. Copy and paste frequently to spread your brilliance throughout the codebase.

**Magic Numbers**: Embed magic numbers directly into your code without any explanation. The more cryptic, the better.

**Error Handling**: Ignore error handling altogether. Let the code fail gracefully by crashing spectacularly. Error messages are for the weak.

**Version Control**: Commit directly to the master branch without any pull requests or code reviews. Branches are for those who fear commitment.

**Frameworks and Libraries**: Reinvent the wheel. Avoid using established frameworks or libraries. Roll your own solutions for everything."

---
&nbsp;

I think this is a fine start and about what I would expect from ChatGPT, but I think there's a lot of room for improvement here. First, though, we will need some ground rules to keep things from getting too out of hand.

## Rules

1. No absurd length requirements.
    - No rules like "Make variable names 500 trillion characters long."
2. Rules cannot be too subjective.
    - No rules like "The code must be poorly written."
3. Code must work as expected.
    - No need to explain this one.
4. No rules to intentionally hinder the performance of the code.
    - No rules like "Have some syncronous operation that waits for 5 years."

## The Worst Style Guide Possible

Here it goes.

1. When possible, avoid creating variables, methods, and classes.
    - If necessary, use a randomly generated string of 10 characters and numbers. If the generated string conflicts with an existing one, generate another string.

    ``` java
    // Good
    /* No variable */

    // Acceptable
    bool H7gF4kL2p9 = true;

    // Bad
    bool isValid = true;
    ```

2. Write compact code.
    - When possible, avoid transitioning to a new line.[^2]

    ``` java
    // Good
    public static void main(string[] args) { /* Your code here. */ }

    // Bad
    public static void main(string[] args) {
        /* Your code here. */
    }
    ```

3. Do not comment code.

    ``` java
    // Good

    // Bad
    /* Here is a comment. */
    ```

4. Test

---
&nbsp;

## The Assignment

I want to build a simple [CLI](https://en.wikipedia.org/wiki/Command-line_interface) bank application.

### Requirements

The application should support the following functionality:

1. Bank account creation an deletion.
2. Adding and withdrawing money from an account.
3. Checking the current balance in an account.

---
&nbsp;

## The Product

---
&nbsp;

[^1]: I understand this is not really a control, but using the word "control" gives this work a sense of rigor.
[^2]: This is difficult to strictly follow for programs written in Python.
