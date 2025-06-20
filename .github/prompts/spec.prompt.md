Step 1:

I'm creating a new feature. First, you will ask me to describe the feature and give it a short tag name. Remind me to turn on Agent mode. Once I've explained the feature, continue to step 2.

---

Step 2:

After I've responded, you will create a new folder in `src/features/` using that tag name and generate a specification document in
`src/features/<tag_name>/__docs__/SPEC.md` for the feature based on the description I provide.

Use `.github/instructions/feature-spec.instructions.md` as the template for the specification document.

Create a README.md file in `src/features/<tag_name>/` that links to the specification document and provides a brief overview of the feature. Use `.github/instructions/feature-readme.instructions.md` as the template for the README.

Once you've created the specification and README, you will ask me to review them and make any necessary adjustments, and wait for my confirmation before continuing with step 3.

---

Step 3:

Create a new file `src/features/<tag_name>/__docs__/SCOPE.md` for the feature based on the `src/features/<tag_name>/__docs__/SPEC.md` document. This file should outline the specific implementation tasks required to complete an MVP of the feature.

Use `.github/instructions/feature-scope.instructions.md` as the template and guide for creating the scope document.
