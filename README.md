# Conditional Rendering and "Views"

_Introduction_

In this lesson we will explore various ways of conditionally rendering elements in React for the sake of building out swappable full-page views.

### SWBAT
- Use boolean short circuiting, ternary operators, if/else, and switch statements to conditionally render React components
- Build React apps with distinct views
- Discuss how this approach differs from traditional HTML document navigation

## Conditional Rendering: Nuts and Bolts

#### Boolean Short Circuiting

React's JSX syntax enables several different methods for conditionall rendering content or React components.   One of the simplest approaches is one that we have already seen: the Boolean shortcircuit.  

```javascript
class BooleanShort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ctr: 0
    };
  }

  componentDidMount() {
    setInterval(() => this.setState(state => ({
      ctr: state.ctr + 1
    })), 1000);
  }

  render() {
    return (
      <div class="item">
        <h2>Boolean Short Circuit</h2>
        <p>{this.state.ctr}</p>
        {this.state.ctr % 2 === 0 && <p>The counter is even</p>}
      </div>
    )
  }
}

export default BooleanShort
```

The key piece to is the render method where the conditional `&&` prevents the "even" message when false and rendering the `<p>` tag when the `ctr` variable is even.


Let's do a quick refactor. Moving the `<p>` tag out of the return statement and invoking a previously defined method.

```javascript
class BooleanShort extends Component {
  // . . .
  
  evenMsg() {
    return <p>The counter is even</p>
  }

  render() {
    const ctr = this.state.ctr;
    return (
      <div class="item">
        <h2>Boolean Short Circuit</h2>
        <p>{ctr}</p>
        {ctr % 2 === 0 && this.evenMsg()}
      </div>
    )
  }
}

export default BooleanShort
```

Methods that return JSX fragments and variables explicitly retrieved from `this.state` can make the render method much easier to parse and overview at a high level.

#### Ternary Operators

We've also seen the ternary operator approach to conditional rendering.  This particular strategy benefits greatly from factoring out helper methods that return JSX fragments since the ternary syntax is already noisy and anything we do to simplify the lines in which it is used is usually worth it.

```javascript
class RandomUser extends Component {
  // ...
  local() {
    const user = this.state.user;
    return (
      <div>{user.name.first} is a local</div>
    );
  }

  international() {
    const user = this.state.user;
    return (
      <div>{user.name.first} is a friend from abroad</div>
    )
  }

  render() {
    const user = this.state.user;
    return (<div className="item">
      <h2>Ternary Operator</h2>
      <div>
        {user.nat === 'US'? this.local() : this.international() }
        <img src={user.picture.medium} />
      </div>
    </div>
    );
  }
}

export default RandomUser
```

This example is simple and the helper methods are only returning single lines of JSX, but forcing them all in one line or separating into multiple lines using parentheses for the ternary operator would make a mess.  Notice how the user can have different pieces of their bio displayed either conditionally or directly.  JSX enables us to flexibly choose which parts of the information to conditionally render and which is always rendered the same way.

#### If / Else

Extending the idea of using helper methods to conditionally render pieces of markup, we can use normal javascript statements to decide which pieces of information to render.

```javascript
class Swanson extends Component {
  // . . .

  getQuoteDescription() {
    const quote = this.state.quote;
    if (quote.length === 0) {
      return <div>There is no quote yet</div>
    } else if (quote.slice(0, 2) === "I ") {
      return <div>Ron is probably talking about himself</div>
    } else if (quote.length < 50) {
      return <div>What a wonder.  Ron uttered a short quote</div>
    } else {
      return <div>Unsurprisingly, Ron rambled for a long time</div>
    }
  }
  render() {
    const quote = this.state.quote;
    return (
      <div class="item">
        <h2>If / Else</h2>
        <h4>{quote}</h4>
        {this.getQuoteDescription()}
      </div>
    );
  }
}

export default Swanson
```

Part of the power of JSX is the ability to seamlessly blend javascript and markup fragments together, thus allowing us to think programmatically about how to render small or large bits of our ui.  These ideas can be applied broadly, such that quite subtle and complex rendering logic can be expressed in a readable form using JSX.

Note above the many `return` statements nested within the if / else blocks.  Generally this is considered an anti-pattern, since functions that `return` in more than one place tend to be more difficult to reason about; however, in React when determining what piece of JSX to render this becomes tolerable since we are often writing straightforward functional components that return well-defined values.  This idea will recur in the next section.

#### Switch

The abve if / else logic could easily be translated into a switch statement.  Switch-style conditional rendering is particularly useful when there is a distinct view that needs to be displayed based on some state variable.  As we will see, this style is well suited to handling screen or view transitions since in many common ui layouts there tends to be a main view or section that gets swapped out.

Consider the following example:

```javascript
import React, { Component } from 'react';
import Contact from './Contact';

class SimpleNav extends Component {
  // . . .

  getView() {
    const view = this.state.currentView;
    switch(view) {
      case 'home':
        return <div>This is Home</div>;
      case 'about':
        return <div>Some Stuff About this Demo</div>
      case 'contact':
        return <Contact />
      default:
        return <div>Welcome to the Switch Demo</div>
    }
  }

  render() {
    return (
      <div className="item">
        <h2>Switch View</h2>
        <div>
          <button onClick={() => this.setView('about')}>
            About
          </button>
          <button onClick={() => this.setView('home')}>
            Home
          </button>
          <button onClick={() => this.setView('contact')}>
            Contact
          </button>
        </div>
        {this.getView()}
      </div>
    );
  }
}

export default SimpleNav
```

Notice how the `<Contact />` component is rendered when the `currentView` is set to `'contact'`.  Not only can we return raw "html" elements from our methods, we can also return components that we have written ourselves.  This flexibility allows developers full control over how their own components will be rendered.

## "Routing" with Switch

As we saw in the last example, it is possible to return React components we write ourselves from helper methods organized with a switch statement.  This strategy is well suited to solving the routing problem.  Routing is how distinct views or screens are displayed to the user based on their current needs or expectations.  

Since it is almost always untenable to display every piece of information an application offers in one view, apps are decomposed into many different views each of which offers an organized rendering of a particular set of features or information.  By associating each distinct view with a particular string or value stored in a state variable, we can control what high-level view is displayed to the user by toggling this state variable.  In the `render` method of the top-level component we could use a helper method with a switch statement to render a particular container or view component based on the routing state variable, in these examples `currentView` is often used.  The state variable can be updated with clickable buttons or just plain elements with an `onClick` attribute that updates `currentView`.  Thus something approximating the routing of vanilla HTML can be accomplished.

A few caveats:
- The `back` and `forward` buttons in browsers will not work with this approach.  Although there are workarounds, we won't worry about them right now
- links to particular views will not work directly with this approach.  So the only way to navigate to anything other than the main page of our apps will have to happen after the main component is loaded
- If the app is refreshed the currentView will be lost
- While there are drawbacks, this approach let's us get a first glance into "Single Page Applications" which have gradually become the dominant paradigm in modern web development
