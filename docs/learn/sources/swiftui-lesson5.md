# 📘 SwiftUI for Beginners

## Lesson 5 — Navigation & Multiple Screens

So far, everything we've built has lived on a **single screen**.

In Lesson 4, we created a list of data:

```text
My Tasks

✓ Learn SwiftUI
○ Build a small app
○ Practice every day
```

But real apps rarely have only one screen.

Think about apps you already use:

```text
Messages
   ↓
Conversation

Products
   ↓
Product Details

Contacts
   ↓
Contact Details

Settings
   ↓
Account Settings
```

A very common pattern is:

```text
LIST
  ↓
SELECT AN ITEM
  ↓
DETAIL SCREEN
```

In this lesson, we'll learn how SwiftUI handles navigation using:

**`NavigationStack` → `NavigationLink` → Destination → Passing Data**

By the end, we'll turn our task list into a small multi-screen app:

```text
┌──────────────────────────────┐
│          My Tasks            │
│                              │
│  ✓ Learn SwiftUI          >  │
│                              │
│  ○ Build a small app      >  │
│                              │
│  ○ Practice every day     >  │
│                              │
└──────────────────────────────┘

              ↓ Tap

┌──────────────────────────────┐
│  < My Tasks                  │
│                              │
│         Task Details         │
│                              │
│       Learn SwiftUI          │
│                              │
│          Completed           │
│                              │
└──────────────────────────────┘
```

The important idea is:

> **Navigation lets the user move between screens while carrying the data needed by the next screen.**

---

# 1. Why Do Apps Need Multiple Screens?

Imagine putting an entire app on one screen:

```text
Tasks
Task Details
Profile
Settings
Search
Notifications
Help
```

That would quickly become overwhelming.

Instead, we divide the app into smaller screens.

For example:

```text
Home
 │
 ├── Tasks
 │     │
 │     └── Task Details
 │
 ├── Profile
 │
 └── Settings
```

Each screen has a particular responsibility.

In SwiftUI, each screen is usually just another `View`.

For example:

```swift
struct HomeView: View {
    var body: some View {
        Text("Home")
    }
}
```

and:

```swift
struct DetailView: View {
    var body: some View {
        Text("Details")
    }
}
```

We already know how to create views.

Now we need a way to move between them.

---

# 2. Meet `NavigationStack` 🧭

SwiftUI provides:

```swift
NavigationStack
```

A `NavigationStack` creates an environment where views can navigate from one screen to another.

Let's start with:

```swift
struct HomeView: View {

    var body: some View {

        NavigationStack {
            Text("Home")
        }
    }
}
```

Visually, nothing dramatic happens yet.

```text
┌──────────────────────────────┐
│                              │
│             Home             │
│                              │
└──────────────────────────────┘
```

But now the screen is inside a navigation system.

Think of `NavigationStack` as the container that manages our navigation history.

```text
NavigationStack
      │
      ▼
    Home
```

Later, when we move to another screen:

```text
NavigationStack
      │
      ├── Home
      │
      └── Details
```

SwiftUI remembers that Details came after Home.

That allows the user to go back.

---

# 3. Adding a Navigation Title

Screens inside a `NavigationStack` can have navigation titles.

```swift
NavigationStack {

    Text("Welcome!")

        .navigationTitle("Home")
}
```

Now we get something like:

```text
┌──────────────────────────────┐
│ Home                         │
│                              │
│          Welcome!            │
│                              │
└──────────────────────────────┘
```

The modifier:

```swift
.navigationTitle("Home")
```

tells the navigation system what title this screen should display.

For our task app, we might write:

```swift
.navigationTitle("My Tasks")
```

---

# 4. Meet `NavigationLink` 🔗

Now we need something the user can tap.

SwiftUI provides:

```swift
NavigationLink
```

Here's a simple example:

```swift
NavigationStack {

    NavigationLink("Show Details") {
        DetailView()
    }
}
```

When the user sees:

```text
Show Details >
```

and taps it, SwiftUI displays:

```swift
DetailView()
```

The flow is:

```text
HomeView
   │
   │ Tap NavigationLink
   ▼
DetailView
```

Let's create the destination:

```swift
struct DetailView: View {

    var body: some View {
        Text("This is the detail screen")
            .navigationTitle("Details")
    }
}
```

Now we have two screens.

---

# 5. Our First Multi-Screen App

Let's put everything together.

```swift
struct HomeView: View {

    var body: some View {

        NavigationStack {

            VStack(spacing: 20) {

                Text("Welcome")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                NavigationLink("Open Details") {
                    DetailView()
                }
            }
            .navigationTitle("Home")
        }
    }
}
```

And:

```swift
struct DetailView: View {

    var body: some View {

        VStack(spacing: 20) {

            Text("Details")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text("You navigated to another screen!")
        }
        .navigationTitle("Details")
    }
}
```

The user experience becomes:

```text
HOME

Welcome

[ Open Details ]
       │
       │ tap
       ▼
DETAILS

You navigated to another screen!
```

SwiftUI also gives us a Back button automatically.

```text
< Home        Details
```

We didn't have to create it ourselves.

Because the screens are inside a `NavigationStack`, SwiftUI understands the navigation history.

---

# 6. How the Navigation Stack Works 🧠

The word **stack** is important.

Imagine a stack of cards.

Initially:

```text
┌─────────────┐
│    Home     │
└─────────────┘
```

Navigate to Details:

```text
┌─────────────┐
│   Details   │
├─────────────┤
│    Home     │
└─────────────┘
```

Details is now on top.

Navigate again:

```text
┌─────────────┐
│ More Info   │
├─────────────┤
│   Details   │
├─────────────┤
│    Home     │
└─────────────┘
```

When the user taps Back:

```text
More Info
    ↓ removed

Details becomes visible again
```

Back again:

```text
Details
   ↓ removed

Home becomes visible again
```

Conceptually:

```text
PUSH
 ↓

Home → Details → More Info

                  ↑
                 POP

Home ← Details ← More Info
```

You don't need to memorize the words **push** and **pop** right now.

The important idea is:

> `NavigationStack` remembers the screens the user moved through.

---

# 7. Navigation Becomes More Useful With Data

Opening a generic Detail screen is useful for learning navigation.

But real apps usually need something more.

Imagine our task list:

```text
Learn SwiftUI
Build a small app
Practice every day
```

If the user taps:

```text
Learn SwiftUI
```

the detail screen should show:

```text
Learn SwiftUI
```

If they tap:

```text
Practice every day
```

the detail screen should show:

```text
Practice every day
```

We don't want to create:

```text
LearnSwiftUIDetailView
BuildSmallAppDetailView
PracticeEveryDayDetailView
```

Instead, we'll create **one reusable detail screen** and pass the selected task into it.

---

# 8. Bringing Back Our `Task` Model

From Lesson 4, we had a model like this:

```swift
struct Task: Identifiable {
    let id = UUID()
    let title: String
    let isCompleted: Bool
}
```

And some data:

```swift
let tasks = [
    Task(
        title: "Learn SwiftUI",
        isCompleted: true
    ),
    Task(
        title: "Build a small app",
        isCompleted: false
    ),
    Task(
        title: "Practice every day",
        isCompleted: false
    )
]
```

Remember the relationship:

```text
Task
  ↓
represents one item

tasks
  ↓
contains many Task values
```

Now we're going to use the same data for navigation.

---

# 9. Creating a Task Detail Screen

Let's create:

```swift
struct TaskDetailView: View {

    let task: Task

    var body: some View {

        VStack(spacing: 20) {

            Image(
                systemName: task.isCompleted
                    ? "checkmark.circle.fill"
                    : "circle"
            )
            .font(.system(size: 60))

            Text(task.title)
                .font(.title)
                .fontWeight(.bold)

            Text(
                task.isCompleted
                    ? "Completed"
                    : "Not Completed"
            )
            .foregroundStyle(.secondary)

            Spacer()
        }
        .padding()
        .navigationTitle("Task Details")
    }
}
```

The most important line is:

```swift
let task: Task
```

This means:

> `TaskDetailView` needs a `Task` in order to display itself.

The screen doesn't own a particular task.

It receives one.

---

# 10. Passing Data to Another Screen 📦

Suppose we have:

```swift
let task = Task(
    title: "Learn SwiftUI",
    isCompleted: true
)
```

We can create the detail screen like this:

```swift
TaskDetailView(task: task)
```

We're passing the task into the next view.

Conceptually:

```text
TaskListView

selected Task
     │
     │ pass data
     ▼

TaskDetailView
```

Then the detail screen can read:

```swift
task.title
```

and:

```swift
task.isCompleted
```

So the destination isn't hardcoded.

Its UI depends on the task it receives.

---

# 11. Combining `List` and `NavigationLink`

Now we can connect everything.

```swift
struct TaskListView: View {

    let tasks = [
        Task(
            title: "Learn SwiftUI",
            isCompleted: true
        ),
        Task(
            title: "Build a small app",
            isCompleted: false
        ),
        Task(
            title: "Practice every day",
            isCompleted: false
        )
    ]

    var body: some View {

        NavigationStack {

            List(tasks) { task in

                NavigationLink {
                    TaskDetailView(task: task)
                } label: {
                    TaskRow(task: task)
                }
            }
            .navigationTitle("My Tasks")
        }
    }
}
```

Look carefully at this part:

```swift
List(tasks) { task in
```

For every task, SwiftUI creates a row.

Then:

```swift
NavigationLink {
    TaskDetailView(task: task)
} label: {
    TaskRow(task: task)
}
```

The row becomes tappable.

Tap that row and SwiftUI creates:

```swift
TaskDetailView(task: task)
```

using the exact task that was selected.

---

# 12. Follow One Task Through the App

This is worth visualizing.

Our array contains:

```text
Task 1
title: Learn SwiftUI
completed: true

Task 2
title: Build a small app
completed: false

Task 3
title: Practice every day
completed: false
```

`List` creates:

```text
✓ Learn SwiftUI          >
○ Build a small app      >
○ Practice every day     >
```

Now the user taps:

```text
○ Build a small app      >
```

That row represents:

```text
Task
├── title: Build a small app
└── isCompleted: false
```

SwiftUI passes that value into:

```swift
TaskDetailView(task: task)
```

The detail screen reads the data and displays:

```text
Task Details

○

Build a small app

Not Completed
```

The flow is:

```text
tasks
  ↓
List
  ↓
TaskRow
  ↓
User taps a task
  ↓
NavigationLink
  ↓
Selected Task
  ↓
TaskDetailView
```

This is an extremely common app pattern.

---

# 13. One Detail Screen, Many Possible Results

The nice part is that we only created:

```swift
TaskDetailView
```

once.

But it can display many different tasks.

```text
TaskDetailView
      ▲
      │
 ┌────┼──────────────┐
 │    │              │
 │    │              │
Task 1             Task 2             Task 3
 │                   │                  │
 ▼                   ▼                  ▼
Learn SwiftUI   Build small app   Practice every day
```

The **view structure stays the same**.

The **data changes**.

This should feel familiar from previous lessons.

Lesson 3:

```text
State changes
     ↓
UI changes
```

Lesson 4:

```text
Collection changes
      ↓
Repeated UI changes
```

Lesson 5:

```text
Selected data
      ↓
Destination UI
```

We're gradually building the SwiftUI mental model.

---

# 14. Let's Create a Better Task Row

We can keep our row reusable:

```swift
struct TaskRow: View {

    let task: Task

    var body: some View {

        HStack(spacing: 12) {

            Image(
                systemName: task.isCompleted
                    ? "checkmark.circle.fill"
                    : "circle"
            )

            Text(task.title)

            Spacer()
        }
    }
}
```

Notice that `TaskRow` doesn't know anything about navigation.

It only knows:

> Give me a task and I'll display a row.

Then `TaskListView` decides:

> This row should navigate somewhere when tapped.

That's a useful separation.

```text
TaskRow
   ↓
How one task looks


TaskListView
   ↓
How tasks are listed
and where tapping goes


TaskDetailView
   ↓
How one selected task
looks on its own screen
```

Each view has a clear job.

---

# 15. The Complete Example 🛠️

Here's the complete version.

First, our model:

```swift
struct Task: Identifiable {
    let id = UUID()
    let title: String
    let isCompleted: Bool
}
```

Our reusable row:

```swift
struct TaskRow: View {

    let task: Task

    var body: some View {

        HStack(spacing: 12) {

            Image(
                systemName: task.isCompleted
                    ? "checkmark.circle.fill"
                    : "circle"
            )

            Text(task.title)

            Spacer()
        }
    }
}
```

Our detail screen:

```swift
struct TaskDetailView: View {

    let task: Task

    var body: some View {

        VStack(spacing: 20) {

            Image(
                systemName: task.isCompleted
                    ? "checkmark.circle.fill"
                    : "circle"
            )
            .font(.system(size: 60))

            Text(task.title)
                .font(.title)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)

            Text(
                task.isCompleted
                    ? "Completed"
                    : "Not Completed"
            )
            .foregroundStyle(.secondary)

            Spacer()
        }
        .padding()
        .navigationTitle("Task Details")
    }
}
```

And our main screen:

```swift
struct TaskListView: View {

    let tasks = [
        Task(
            title: "Learn SwiftUI",
            isCompleted: true
        ),
        Task(
            title: "Build a small app",
            isCompleted: false
        ),
        Task(
            title: "Practice every day",
            isCompleted: false
        )
    ]

    var body: some View {

        NavigationStack {

            List(tasks) { task in

                NavigationLink {
                    TaskDetailView(task: task)
                } label: {
                    TaskRow(task: task)
                }
            }
            .navigationTitle("My Tasks")
        }
    }
}
```

Our application now has an actual screen flow:

```text
TaskListView
     │
     │ User selects Task
     ▼
TaskDetailView
     │
     │ Back
     ▼
TaskListView
```

---

# 16. Where Should `NavigationStack` Go?

A common beginner question is:

> Should every screen have its own `NavigationStack`?

Usually, no.

For this example, the stack starts around the main screen:

```swift
NavigationStack {
    List {
        // ...
    }
}
```

Then the destination is pushed **inside that same navigation stack**.

```text
NavigationStack
      │
      ├── TaskListView
      │
      └── TaskDetailView
```

We generally don't need:

```text
NavigationStack
    ↓
TaskListView
    ↓
another NavigationStack
    ↓
TaskDetailView
```

Think of one `NavigationStack` as managing a particular navigation journey.

For now, our simple rule is:

> Put the main screen of this navigation flow inside a `NavigationStack`, then navigate to destination views from there.

---

# 17. Navigation Titles Belong to Screens

Our list screen has:

```swift
.navigationTitle("My Tasks")
```

Our detail screen has:

```swift
.navigationTitle("Task Details")
```

That means each screen describes its own navigation title.

```text
TaskListView
     ↓
"My Tasks"

TaskDetailView
     ↓
"Task Details"
```

This keeps the responsibility close to the screen itself.

---

# 18. Passing More Than One Value

A destination doesn't have to receive an entire model.

For example, we could write:

```swift
struct ProfileView: View {

    let name: String
    let age: Int

    var body: some View {

        VStack {
            Text(name)
            Text("Age: \(age)")
        }
    }
}
```

Then:

```swift
ProfileView(
    name: "Alex",
    age: 28
)
```

But when several values belong together, a model often makes more sense.

Instead of:

```swift
TaskDetailView(
    title: task.title,
    isCompleted: task.isCompleted
)
```

we can simply pass:

```swift
TaskDetailView(task: task)
```

Conceptually:

```text
Instead of carrying:

title
status
priority
due date
notes

separately...

carry:

Task
```

That's another reason models are so useful.

---

# 19. Navigation Is Not the Same as a Sheet

You may eventually see SwiftUI code like:

```swift
.sheet(...)
```

A sheet is another way of presenting content, but it represents a different interaction.

Navigation usually feels like:

```text
List
  ↓
Details
  ↓
More Details
```

A sheet usually appears temporarily over the current screen:

```text
Current Screen
      │
      ▼
┌─────────────────────┐
│                     │
│        Sheet        │
│                     │
└─────────────────────┘
```

For example:

```text
Navigation
→ Open a product's details

Sheet
→ Show a temporary Add Item form
```

We don't need to learn sheets yet.

For this lesson, keep the mental model focused on:

```text
NavigationStack
       ↓
NavigationLink
       ↓
Destination
```

---

# 20. Don't Put Everything in One View

Now that we're creating multiple screens, it's tempting to write everything inside one giant view.

For example:

```text
TaskListView
├── model code
├── row layout
├── detail layout
├── list layout
├── navigation
└── everything else
```

It may work initially, but it becomes harder to understand.

Our current structure is much clearer:

```text
Task
   ↓
Data model

TaskRow
   ↓
One row

TaskListView
   ↓
List screen

TaskDetailView
   ↓
Detail screen
```

This is one of the most useful habits you can develop early:

> Break a screen into views that have clear responsibilities.

That doesn't mean every `Text` needs its own view.

It means meaningful pieces of UI can become reusable components.

---

# 21. A Common Beginner Mistake

Imagine we have:

```swift
NavigationLink("Learn SwiftUI") {
    TaskDetailView(
        task: Task(
            title: "Learn SwiftUI",
            isCompleted: true
        )
    )
}
```

Then:

```swift
NavigationLink("Build a small app") {
    TaskDetailView(
        task: Task(
            title: "Build a small app",
            isCompleted: false
        )
    )
}
```

Then another one.

This works, but we've gone back to hardcoding our data into the UI.

Lesson 4 taught us a better approach:

```swift
List(tasks) { task in
```

and then:

```swift
NavigationLink {
    TaskDetailView(task: task)
} label: {
    TaskRow(task: task)
}
```

Now the same structure works for:

```text
3 tasks
30 tasks
300 tasks
```

The navigation is being created from the data.

---

# 22. Data-Driven Navigation

Let's look at the bigger idea.

Our data is:

```text
tasks
```

That data creates:

```text
rows
```

Each row creates a navigation opportunity:

```text
row
 ↓
NavigationLink
```

And the selected data creates the destination:

```text
selected task
     ↓
TaskDetailView
```

So the entire flow is driven by data:

```text
             tasks
               │
               ▼
              List
               │
      ┌────────┼────────┐
      ▼        ▼        ▼
    Task     Task      Task
      │        │         │
      ▼        ▼         ▼
     Row      Row       Row
      │        │         │
      └────────┼─────────┘
               │
            User taps
               │
               ▼
         Selected Task
               │
               ▼
        TaskDetailView
```

That's a much more powerful mental model than thinking:

> Button 1 opens screen 1, Button 2 opens screen 2...

---

# 23. Lesson 5 Mental Model 🧠

If you remember one flow from this lesson, remember:

```text
┌─────────────────┐
│ NavigationStack │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   List Screen   │
└────────┬────────┘
         │
         │ NavigationLink
         │
         ▼
┌─────────────────┐
│  Selected Data  │
└────────┬────────┘
         │
         │ pass data
         ▼
┌─────────────────┐
│  Detail Screen  │
└─────────────────┘
```

Or more simply:

```text
SCREEN
  ↓
USER SELECTS SOMETHING
  ↓
PASS THE SELECTED DATA
  ↓
NEXT SCREEN
```

And SwiftUI's basic tools are:

```text
NavigationStack
      ↓
NavigationLink
      ↓
Destination View
```

---

# 🎯 Your Challenge

Build a small **Recipe Browser**.

Start with a model:

```swift
struct Recipe: Identifiable {
    let id = UUID()
    let name: String
    let time: Int
    let difficulty: String
}
```

Create several recipes:

```swift
let recipes = [
    Recipe(
        name: "Pasta",
        time: 25,
        difficulty: "Easy"
    ),
    Recipe(
        name: "Vegetable Curry",
        time: 40,
        difficulty: "Medium"
    ),
    Recipe(
        name: "Pancakes",
        time: 20,
        difficulty: "Easy"
    )
]
```

Your first screen should look roughly like:

```text
┌──────────────────────────────┐
│ Recipes                      │
│                              │
│ 🍝 Pasta                  >  │
│    25 minutes                │
│                              │
│ 🍛 Vegetable Curry        >  │
│    40 minutes                │
│                              │
│ 🥞 Pancakes               >  │
│    20 minutes                │
│                              │
└──────────────────────────────┘
```

When the user taps:

```text
Vegetable Curry
```

navigate to:

```text
┌──────────────────────────────┐
│ < Recipes     Recipe Details │
│                              │
│      Vegetable Curry         │
│                              │
│        40 minutes            │
│                              │
│          Medium              │
│                              │
└──────────────────────────────┘
```

Requirements:

- Create a `Recipe` model.
- Make it conform to `Identifiable`.
- Store multiple recipes in an array.
- Put the main screen inside a `NavigationStack`.
- Display the recipes using `List`.
- Make each recipe navigable using `NavigationLink`.
- Create a separate `RecipeRow`.
- Create a separate `RecipeDetailView`.
- Pass the selected `Recipe` into the detail screen.
- Display its name, cooking time, and difficulty.

### ⭐ Bonus challenge

Add another property:

```swift
let isFavorite: Bool
```

Show:

```text
♥ Favourite
```

on the detail screen when it's `true`.

Otherwise show:

```text
♡ Not Favourite
```

Don't make the favourite status interactive yet.

The goal is still:

> **Pass data from one screen to another and let that data determine the destination UI.**

---

# ✅ What You Now Know

You can now build a basic multi-screen SwiftUI application.

You've learned:

```swift
NavigationStack

NavigationLink

.navigationTitle()

Destination Views

Passing Data Between Views
```

And you've combined them with concepts from previous lessons:

```swift
struct

Identifiable

List

ForEach

Reusable Views
```

Our course progression now looks like:

```text
Lesson 1
What is a SwiftUI View?
        ↓
Lesson 2
How do we arrange views?
        ↓
Lesson 3
How does interaction change state and UI?
        ↓
Lesson 4
How does data create repeated UI?
        ↓
Lesson 5
How do we move between screens
and pass selected data?
```

We've now reached an important point.

Our app can:

```text
Display UI
   ✓

Respond to interaction
   ✓

Represent collections of data
   ✓

Create repeated views
   ✓

Navigate between screens
   ✓

Pass data forward
   ✓
```

But there's a new problem.

So far, when a child view receives something like:

```swift
let task: Task
```

it can **read** that data.

What if the child view needs to **change data owned by another view**?

That's where our next lesson begins.

# 📗 Lesson 6 — Sharing State Between Views

We'll learn how a parent and child view can work with the same state using concepts such as:

```swift
@State
@Binding
```

and build the mental model:

```text
Parent owns the state
        ↓
Child receives a binding
        ↓
Child changes the value
        ↓
Parent and child stay in sync
```

That's when the `@State` we learned in Lesson 3 and the reusable views we've been building start working together across multiple views.