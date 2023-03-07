import React from "react";

const FAQ = () => {
	return (
		<div className="p-4 max-w-lg rounded-lg border border-gray-200 shadow-lg sm:p-6 md:p-8 bg-[navy] w-3/4 mx-auto my-20">
			<div
				tabIndex={0}
				className="collapse collapse-plus border border-base-300 bg-green-400 text-white rounded-box">
				<div className="collapse-title text-xl font-medium">
					1 What are the different ways to manage a state in a React
					application?
				</div>
				<div className="collapse-content font-medium">
					<p>
						Every React component has a built-in state. This state is an object
						which stores the property values that belong to a component. State
						is able to keep data from different components in-sync because each
						state update re-renders all relevant components.
					</p>
				</div>
			</div>
			<div
				tabIndex={1}
				className="collapse collapse-plus border border-base-300 mt-10 bg-green-400 text-white rounded-box">
				<div className="collapse-title text-xl font-medium">
					2 How does prototypical inheritance work?
				</div>
				<div className="collapse-content font-medium">
					<p>
						The Prototypal Inheritance is a feature in javascript used to add
						methods and properties in objects. It is a method by which an object
						can inherit the properties and methods of another object.
						Traditionally, in order to get and set the [[Prototype]] of an
						object, we use Object. getPrototypeOf and Object.
					</p>
				</div>
			</div>
			<div
				tabIndex={2}
				className="collapse collapse-plus border border-base-300 mt-10 bg-green-400 text-white rounded-box">
				<div className="collapse-title text-xl font-medium">
					3 What is a unit test? Why should we write unit tests?
				</div>
				<div className="collapse-content font-medium">
					<p>
						The main objective of unit testing is to isolate written code to
						test and determine if it works as intended. Unit testing is an
						important step in the development process, because if done
						correctly, it can help detect early flaws in code which may be more
						difficult to find in later testing stages.
					</p>
				</div>
			</div>
			<div
				tabIndex={3}
				className="collapse collapse-plus border border-base-300 mt-10 bg-green-400 text-white rounded-box">
				<div className="collapse-title text-xl font-medium">
					4 React vs. Angular vs. Vue?
				</div>
				<div className="collapse-content font-medium">
					<p>
						React is a UI library, Angular is a fully-fledged front-end
						framework, while Vue. js is a progressive framework. They can be
						used almost interchangeably to build front-end applications, but
						they're not 100 percent the same, so it makes sense to compare them
						and understand their differences.
					</p>
				</div>
			</div>
		</div>
	);
};

export default FAQ;
