

# 📘 SwiftUI for Beginners

## Lesson 4 — Working With Lists of Data

So far, we've written views individually.

For example:

```swift
Text("Apple")
Text("Banana")
Text("Orange")
```

That works when we have three items.

But imagine an app containing:

```text
10 tasks
50 contacts
200 products
1,000 messages
```

We obviously don't want to write 1,000 `Text` views ourselves.

Instead, real applications usually work like this:

```text
DATA
  ↓
SwiftUI
  ↓
UI
```

In this lesson, we'll learn how to represent data with Swift models and turn collections of that data into views using:

**Array → Model → `ForEach` → `List` → `Identifiable`**

By the end, we'll build a simple **Task List**:

```text
┌──────────────────────────────┐
│                              │
│          My Tasks            │
│                              │
│  ✓ Learn SwiftUI             │
│                              │
│  ○ Build a small app         │
│                              │
│  ○ Practice every day        │
│                              │
│  1 of 3 completed            │
│                              │
└──────────────────────────────┘
```

But the important lesson isn't the task list itself.

It's this:

> **Your data can determine how many views SwiftUI creates.**

---

# 1. The Problem With Hardcoded Views

Suppose we want to display three fruits.

We could write:

```swift
VStack {
    Text("Apple")
    Text("Banana")
    Text("Orange")
}
```

And we'd get:

```text
Apple
Banana
Orange
```

Nothing is wrong with this code.

But what happens when our data changes?

Suppose tomorrow we have:

```text
Apple
Banana
Orange
Mango
Grapes
Watermelon
Strawberry
```

Now we'd have to modify the UI manually:

```swift
VStack {
    Text("Apple")
    Text("Banana")
    Text("Orange")
    Text("Mango")
    Text("Grapes")
    Text("Watermelon")
    Text("Strawberry")
}
```

That's not how we want to build a real application.

The problem is that our **data is mixed directly into our UI structure**.

Instead, we'd like to say:

> Here is my data. SwiftUI, create one view for each item.

---

# 2. Meet Arrays 📦

Swift gives us an `Array` for storing multiple values.

For example:

```swift
let fruits = ["Apple", "Banana", "Orange"]
```

You can imagine it like this:

```text
fruits
  │
  ├── "Apple"
  ├── "Banana"
  └── "Orange"
```

Instead of having three separate variables:

```swift
let fruit1 = "Apple"
let fruit2 = "Banana"
let fruit3 = "Orange"
```

we have one collection:

```swift
let fruits = ["Apple", "Banana", "Orange"]
```

We can access individual values using their position:

```swift
fruits[0]
fruits[1]
fruits[2]
```

which gives us:

```text
Apple
Banana
Orange
```

Arrays become extremely useful in SwiftUI because many screens display **collections of things**:

```text
Messages
Contacts
Tasks
Products
Photos
Notifications
Search Results
```

So now we have the data.

The next question is:

> How do we turn every item in that array into a SwiftUI view?

---

# 3. Meet `ForEach` 🔁

This is where `ForEach` comes in.

Let's start with our fruit array:

```swift
let fruits = ["Apple", "Banana", "Orange"]
```

Now:

```swift
VStack {
    ForEach(fruits, id: \.self) { fruit in
        Text(fruit)
    }
}
```

SwiftUI creates:

```text
Apple
Banana
Orange
```

But notice something important.

We only wrote:

```swift
Text(fruit)
```

**once**.

SwiftUI repeated that view for every item in `fruits`.

Conceptually:

```text
fruits
  │
  ├── Apple  ─────→ Text("Apple")
  │
  ├── Banana ─────→ Text("Banana")
  │
  └── Orange ─────→ Text("Orange")
```

That's our new mental model:

```text
Collection of Data
        ↓
     ForEach
        ↓
One View Per Item
```

---

# 4. Reading `ForEach`

This syntax may look strange at first:

```swift
ForEach(fruits, id: \.self) { fruit in
    Text(fruit)
}
```

Let's break it down.

### `fruits`

```swift
ForEach(fruits, ...)
```

means:

> Go through the values inside `fruits`.

---

### `fruit`

```swift
{ fruit in
```

means:

> For the current item, call it `fruit`.

So as SwiftUI moves through the array:

```text
First time:
fruit = "Apple"

Second time:
fruit = "Banana"

Third time:
fruit = "Orange"
```

Then:

```swift
Text(fruit)
```

creates the view for that particular value.

You can mentally read the entire thing as:

> For each fruit in fruits, create a Text showing that fruit.

That's much less mysterious.

---

# 5. Why Do We Need `id: \.self`? 🤔

You probably noticed this:

```swift
id: \.self
```

Why does SwiftUI need it?

Because SwiftUI needs a way to **identify each item**.

Imagine the array changes:

```text
Before

Apple
Banana
Orange
```

Then:

```text
After

Apple
Mango
Orange
```

SwiftUI needs to understand:

```text
Apple   → still Apple
Banana  → removed
Mango   → new
Orange  → still Orange
```

Identity helps SwiftUI understand which piece of data corresponds to which view.

For simple unique strings in a beginner example, we can use:

```swift
id: \.self
```

which roughly means:

> Use the value itself as its identity.

So:

```text
"Apple"  → identified by "Apple"
"Banana" → identified by "Banana"
"Orange" → identified by "Orange"
```

But real app data is usually more complicated than strings.

That's where **models** become useful.

---

# 6. Real Apps Use Models 🧱

Imagine we're building a task app.

A task isn't just a piece of text.

It might contain:

```text
Title
Completed status
Priority
Due date
Notes
```

We could represent a simple task with a Swift `struct`:

```swift
struct Task {
    let title: String
    let isCompleted: Bool
}
```

Now a `Task` represents one piece of app data.

For example:

```swift
let task = Task(
    title: "Learn SwiftUI",
    isCompleted: true
)
```

Think of the model like a small container:

```text
Task
├── title: "Learn SwiftUI"
└── isCompleted: true
```

We can access its values:

```swift
task.title
task.isCompleted
```

This is a big step toward how real apps are structured.

Instead of our UI containing all the information directly, we have:

```text
DATA MODEL
    ↓
   UI
```

---

# 7. Creating Multiple Tasks

Now let's create several tasks:

```swift
let tasks = [
    Task(title: "Learn SwiftUI", isCompleted: true),
    Task(title: "Build a small app", isCompleted: false),
    Task(title: "Practice every day", isCompleted: false)
]
```

Conceptually:

```text
tasks
  │
  ├── Task
  │    ├── Learn SwiftUI
  │    └── true
  │
  ├── Task
  │    ├── Build a small app
  │    └── false
  │
  └── Task
       ├── Practice every day
       └── false
```

Now our screen has actual structured data to work with.

But we still need one thing.

SwiftUI needs to know the identity of each `Task`.

---

# 8. Meet `Identifiable` 🪪

Swift has a protocol called:

```swift
Identifiable
```

We can make our model conform to it:

```swift
struct Task: Identifiable {
    let id = UUID()
    let title: String
    let isCompleted: Bool
}
```

Now every task gets its own unique `id`.

You can imagine:

```text
Task
├── id: A1F2...
├── title: "Learn SwiftUI"
└── isCompleted: true
```

Another task:

```text
Task
├── id: B7C4...
├── title: "Build a small app"
└── isCompleted: false
```

Even if two tasks happen to have the same title, their IDs can still be different.

For example:

```text
Task
id: 101
title: "Practice"

Task
id: 202
title: "Practice"
```

Same title.

Different identity.

That's much more reliable than using the title itself as the identity.

---

# 9. `ForEach` Gets Cleaner With `Identifiable`

Earlier we wrote:

```swift
ForEach(fruits, id: \.self) { fruit in
    Text(fruit)
}
```

But when our model conforms to `Identifiable`, SwiftUI already knows how to identify each item.

So we can write:

```swift
ForEach(tasks) { task in
    Text(task.title)
}
```

That's it.

No:

```swift
id: \.self
```

needed.

SwiftUI uses:

```swift
task.id
```

behind the scenes.

Our data flow now looks like:

```text
tasks
  │
  ▼
ForEach
  │
  ├── Task 1 ───→ View
  ├── Task 2 ───→ View
  └── Task 3 ───→ View
```

This pattern appears constantly in SwiftUI applications.

---

# 10. Let's Make Each Row More Interesting

We don't have to create only a `Text`.

Each item can produce an entire layout.

For example:

```swift
ForEach(tasks) { task in

    HStack {

        Image(
            systemName: task.isCompleted
                ? "checkmark.circle.fill"
                : "circle"
        )

        Text(task.title)

        Spacer()
    }
}
```

Now our data controls multiple parts of the UI.

If:

```swift
task.isCompleted == true
```

we show:

```text
✓ Learn SwiftUI
```

Otherwise:

```text
○ Build a small app
```

Conceptually:

```text
Task Data
   │
   ├── title ───────────→ Text
   │
   └── isCompleted ─────→ Image
```

This is the same idea we learned in Lesson 3:

> **State and data determine the UI.**

We're simply applying it to **collections of data** now.

---

# 11. `VStack` vs `List`

We could display our tasks using:

```swift
VStack {
    ForEach(tasks) { task in
        Text(task.title)
    }
}
```

That's perfectly valid.

But SwiftUI also provides a container specifically designed for displaying collections of rows:

```swift
List
```

For example:

```swift
List {
    ForEach(tasks) { task in
        Text(task.title)
    }
}
```

Now the interface behaves more like a standard scrolling list.

You can think of the difference like this:

```text
VStack
│
├── General vertical layout
├── You control the surrounding layout
└── Useful for smaller groups of views


List
│
├── Designed for collections of rows
├── Scrolls naturally
└── Useful for list-style interfaces
```

We'll learn more advanced `List` features later.

For now, the important idea is simply:

> `List` is a container designed for displaying collections of data.

---

# 12. `List` Can Work Directly With Data

Because our `Task` model is `Identifiable`, we can make the code even shorter.

Instead of:

```swift
List {
    ForEach(tasks) { task in
        Text(task.title)
    }
}
```

we can write:

```swift
List(tasks) { task in
    Text(task.title)
}
```

Read that as:

> Create a list using these tasks, and create this row for each task.

Conceptually:

```text
tasks
  ↓
List
  ↓
Task
  ↓
Row
```

This is a very common SwiftUI pattern.

---

# 13. Let's Create a Reusable Row 🧩

Our task row is starting to contain several views:

```swift
HStack {
    Image(...)
    Text(...)
    Spacer()
}
```

Rather than keeping all of that inside our `List`, we can create another SwiftUI view.

```swift
struct TaskRow: View {

    let task: Task

    var body: some View {

        HStack {

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

Notice this line:

```swift
let task: Task
```

`TaskRow` receives a task and uses it to build its UI.

Now our list becomes:

```swift
List(tasks) { task in
    TaskRow(task: task)
}
```

Much cleaner.

The flow is:

```text
TaskListView
     │
     ▼
   tasks
     │
     ▼
    List
     │
     ▼
  each Task
     │
     ▼
  TaskRow
```

This is our first taste of building interfaces from **small reusable views**.

---

# 14. Let's Build the Task List 🛠️

Now let's combine everything.

```swift
struct Task: Identifiable {
    let id = UUID()
    let title: String
    let isCompleted: Bool
}
```

Then our row:

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

And finally the screen:

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

        VStack(alignment: .leading, spacing: 16) {

            Text("My Tasks")
                .font(.largeTitle)
                .fontWeight(.bold)

            List(tasks) { task in
                TaskRow(task: task)
            }
        }
        .padding()
    }
}
```

Now look at how the pieces fit together:

```text
Task
  ↓
defines one item

tasks
  ↓
stores many Task values

List
  ↓
goes through the tasks

TaskRow
  ↓
turns each Task into UI
```

The important thing is that we aren't manually creating:

```text
TaskRow 1
TaskRow 2
TaskRow 3
```

Our **data determines how many rows exist**.

---

# 15. What Happens If We Add Another Task?

This is where the benefit becomes obvious.

Suppose we add:

```swift
Task(
    title: "Read Swift documentation",
    isCompleted: false
)
```

Our array now contains four tasks.

We don't need to add another `TaskRow`.

We don't need to change the `List`.

We don't need to change `ForEach`.

The data changed:

```text
3 Tasks
   ↓
4 Tasks
```

and therefore the UI becomes:

```text
3 Rows
   ↓
4 Rows
```

That's the key idea.

```text
DATA CHANGES
     ↓
NUMBER OF ITEMS CHANGES
     ↓
SWIFTUI BUILDS THE APPROPRIATE UI
```

---

# 16. Counting Completed Tasks

Because our information is now represented as data, we can do more with it.

Suppose we want to show:

```text
1 of 3 completed
```

We can calculate the completed tasks:

```swift
let completedCount = tasks.filter { task in
    task.isCompleted
}.count
```

Then display:

```swift
Text("\(completedCount) of \(tasks.count) completed")
```

Our screen can now derive information from the same data used to build the list.

Conceptually:

```text
              tasks
                │
        ┌───────┴────────┐
        ▼                ▼
      List          completedCount
        │                │
        ▼                ▼
     Rows         "1 of 3 completed"
```

One collection of data can drive multiple parts of the interface.

---

# 17. Models Keep UI and Data Clear

Compare these two approaches.

### Hardcoded UI

```swift
Text("✓ Learn SwiftUI")
Text("○ Build a small app")
Text("○ Practice every day")
```

The information is buried directly inside the views.

Now compare that with:

```swift
let tasks = [
    Task(title: "Learn SwiftUI", isCompleted: true),
    Task(title: "Build a small app", isCompleted: false),
    Task(title: "Practice every day", isCompleted: false)
]
```

and:

```swift
List(tasks) { task in
    TaskRow(task: task)
}
```

Now we have a much clearer separation:

```text
DATA
Task
tasks

        ↓

UI
TaskRow
TaskListView
```

This becomes increasingly important as applications grow.

---

# 18. A Very Important Distinction

You might be wondering:

> Why are our tasks declared with `let`? Didn't Lesson 3 teach us `@State`?

Good question.

In this lesson, we're focusing on **representing and displaying collections of data**.

Our tasks aren't changing yet:

```swift
let tasks = [...]
```

The user cannot add, delete or complete tasks.

That is intentional.

If we tried to introduce:

```text
Arrays
Models
ForEach
List
Identifiable
@State arrays
Bindings
Editing
Deleting
Adding
```

all at once, we'd bury the important idea.

For now:

```text
Lesson 3
State can change UI.

Lesson 4
Collections of data can create UI.
```

Later, we'll combine those ideas.

That's when things get really interesting.

---

# 19. `ForEach` or `List`? 🤔

Beginners often wonder which one they should use.

They aren't really competitors.

`ForEach` means:

> Create views for each item in a collection.

`List` means:

> Display content using a list-style container.

You can use them together:

```swift
List {
    ForEach(tasks) { task in
        TaskRow(task: task)
    }
}
```

Or `List` can work directly with identifiable data:

```swift
List(tasks) { task in
    TaskRow(task: task)
}
```

And `ForEach` can be used outside a `List`:

```swift
VStack {
    ForEach(tasks) { task in
        TaskRow(task: task)
    }
}
```

So remember:

```text
ForEach
   ↓
Repeats views from data

List
   ↓
Provides a list-style container
```

---

# 20. Lesson 4 Mental Model 🧠

If you remember one diagram from this lesson, remember this:

```text
             DATA

       ┌──────────────┐
       │    tasks     │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ List/ForEach │
       └──────┬───────┘
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
    Task    Task      Task
      │       │        │
      ▼       ▼        ▼
     Row     Row      Row
```

Or even more simply:

```text
DATA
  ↓
ForEach / List
  ↓
UI
```

Lesson 3 taught us:

```text
STATE
  ↓
 UI
```

Lesson 4 adds:

```text
COLLECTIONS OF DATA
        ↓
       UI
```

Those two ideas are going to come together repeatedly throughout SwiftUI.

---

# 🎯 Your Challenge

Build a simple **Favourite Movies** screen.

Your data should contain at least four movies.

Start with a model:

```swift
struct Movie: Identifiable {
    let id = UUID()
    let title: String
    let year: Int
}
```

Create an array:

```swift
let movies = [
    Movie(title: "Movie One", year: 2022),
    Movie(title: "Movie Two", year: 2023),
    Movie(title: "Movie Three", year: 2024),
    Movie(title: "Movie Four", year: 2025)
]
```

Your screen might look like:

```text
┌──────────────────────────────┐
│                              │
│      Favourite Movies       │
│                              │
│  🎬 Movie One               │
│     2022                     │
│                              │
│  🎬 Movie Two               │
│     2023                     │
│                              │
│  🎬 Movie Three             │
│     2024                     │
│                              │
│  🎬 Movie Four              │
│     2025                     │
│                              │
└──────────────────────────────┘
```

Requirements:

- Create a `Movie` model.
- Make it conform to `Identifiable`.
- Store several movies in an array.
- Display them using `List` or `ForEach`.
- Show both the movie title and year.
- Create a separate `MovieRow` view.

### ⭐ Bonus challenge

Add another property:

```swift
let isFavorite: Bool
```

Then display:

```text
♥
```

for favourite movies and:

```text
♡
```

for the others.

Don't make the heart interactive yet.

For now, let the **model's data determine which image the UI displays**.

---

# ✅ What You Now Know

You can now represent collections of information and turn them into SwiftUI views.

You've learned:

```swift
Array

struct

ForEach

List

Identifiable

UUID

filter
```

You also understand why models matter.

Instead of:

```text
UI
UI
UI
UI
UI
```

we can think:

```text
       DATA
         ↓
      SwiftUI
         ↓
    MANY VIEWS
```

And our first four lessons now form a very useful progression:

```text
Lesson 1
What is a SwiftUI View?
        ↓
Lesson 2
How do we arrange views?
        ↓
Lesson 3
How does user interaction change the UI?
        ↓
Lesson 4
How does data create repeated UI?
```

We're now ready for something every real application eventually needs:

# 📗 Lesson 5 — Navigation & Multiple Screens

So far, everything we've built lives on one screen.

Next we'll learn how to move from:

```text
Task List
```

to:

```text
Task List
    ↓
Task Details
```

using **`NavigationStack`**, **`NavigationLink`**, and passing data from one screen to another.

That's when our small SwiftUI examples begin turning into a multi-screen application.
````

