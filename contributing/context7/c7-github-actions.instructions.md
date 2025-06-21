TITLE: Demonstrating env Context Usage in GitHub Actions YAML
DESCRIPTION: This YAML snippet illustrates how the `env` context can be defined at the workflow, job, and step levels in a GitHub Actions workflow. It shows how environment variables are inherited and overridden, and how the `env` context can be referenced in step `run` commands, `if` conditions, and `name` properties.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0278-env-context.md#_snippet_0

LANGUAGE: YAML
CODE:
```
env:
  env1: 10
  env2: 20
  env3: 30
jobs:
  build:
    env:
      env1: 100
      env2: 200
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo ${{ env.env1 }}  // 1000
          echo $env1            // 1000
          echo $env2            // 200
          echo $env3            // 30
        if: env.env2 == 200     // true
        name: ${{ env.env1 }}_${{ env.env2 }}   //1000_200
        env:
          env1: 1000
```

----------------------------------------

TITLE: Defining a Composite Action (YAML)
DESCRIPTION: Shows the structure of an `action.yml` file for a composite action. It uses `runs: using: "composite"` and defines a sequence of nested `run` steps with specified shells.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_1

LANGUAGE: YAML
CODE:
```
runs:
  using: "composite"
  steps:
    - run: pip install -r requirements.txt
      shell: bash
    - run: npm install
      shell: bash
```

----------------------------------------

TITLE: Defining and Using Inputs in Composite Action (Action YAML)
DESCRIPTION: This `action.yml` snippet defines an input (`your_name`) for a composite action, providing a description and a default value. It also shows how to reference this input within a `run` step using the `inputs` context.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_6

LANGUAGE: YAML
CODE:
```
inputs:
  your_name:
    description: 'Your name'
    default: 'Ethan'
runs:
  using: "composite"
  steps: 
    - run: echo hello ${{ inputs.your_name }}
      shell: bash
```

----------------------------------------

TITLE: Using hashFiles Expression Function for Cache Key in YAML
DESCRIPTION: Demonstrates the proposed usage of the new `hashFiles` expression function within the `actions/cache` step. This function calculates a content hash for files matching the specified glob pattern, providing a more reliable cache key based on actual file content.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0279-hashFiles-expression-function.md#_snippet_2

LANGUAGE: yaml
CODE:
```
  steps:
  - uses: actions/cache@v1
    with:
      key: ${{hashFiles('**/package-lock.json')}}-${{github.ref}}-${{runner.os}}
```

----------------------------------------

TITLE: Controlling Workflow Execution on Step Failure (YAML)
DESCRIPTION: Illustrates how the `continue-on-error: false` setting on a step in a standard GitHub Actions workflow prevents subsequent steps from running if the current step fails.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_13

LANGUAGE: yaml
CODE:
```
steps:
  - run: exit 1
  - id: bar
    uses: user/test@v1
    continue-on-error: false
  - id: foo
    run: echo "Hello World" <------- This step will not run
```

----------------------------------------

TITLE: Allowing Composite Action Steps to Continue on Error (YAML)
DESCRIPTION: Demonstrates using `continue-on-error: true` for a step within a composite GitHub Action, allowing subsequent steps within the composite action to execute even if the current step fails.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_14

LANGUAGE: yaml
CODE:
```
runs:
  using: "composite"
  steps:
    - run: exit 1
      continue-on-error: true
      shell: bash
    - run: echo "Hello World 2" <----- This step will run
      shell: bash
```

----------------------------------------

TITLE: Example Workflow Using Composite Action (YAML)
DESCRIPTION: Demonstrates a GitHub Actions workflow file (`workflow.yml`) that includes various steps, including using a composite action (`user/composite@v1`) alongside standard actions and run steps.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_0

LANGUAGE: YAML
CODE:
```
jobs:
  build:
    runs-on: self-hosted
    steps:
    - id: step1
      uses: actions/setup-python@v1
    - id: step2
      uses: actions/setup-node@v2
    - uses: actions/checkout@v2
    - uses: user/composite@v1
    - name: workflow step 1
      run: echo hello world 3
    - name: workflow step 2
      run: echo hello world 4
```

----------------------------------------

TITLE: Test GitHub.com Connectivity with Curl
DESCRIPTION: Use these curl commands to verify that a self-hosted runner can connect to the necessary GitHub.com endpoints for actions, including API, codeload, vstoken, pipelines, and results-receiver services. These checks help diagnose firewall or network issues.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/actions.md#_snippet_0

LANGUAGE: Shell
CODE:
```
curl -v https://api.github.com/zen
curl -v https://codeload.github.com/_ping
curl -v https://vstoken.actions.githubusercontent.com/_apis/health
curl -v https://pipelines.actions.githubusercontent.com/_apis/health
curl -v https://results-receiver.actions.githubusercontent.com/health
```

----------------------------------------

TITLE: Problem Matcher Configuration with Default fromPath (JSON)
DESCRIPTION: This JSON configuration defines a problem matcher named 'csc-minimal'. It specifies a default `fromPath` to root file paths when the compiler output doesn't provide this information. The `pattern` uses a regular expression to parse lines like 'ClassLibrary.cs(16,24): warning CS0612: ...' and extract file, line, column, severity, code, and message.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md#_snippet_3

LANGUAGE: JSON
CODE:
```
{
    "problemMatcher": [
        {
            "owner": "csc-minimal",
            "fromPath": "ClassLibrary/ClassLibrary.csproj",
            "pattern": [
                {
                    "regexp": "^(.+)\\((\\d+),(\\d+)\\): (error|warning) (.+): (.*)$",
                    "file": 1,
                    "line": 2,
                    "column": 3,
                    "severity": 4,
                    "code": 5,
                    "message": 6
                }
            ]
        }
    ]
}
```

----------------------------------------

TITLE: Using steps.outcome in GitHub Actions Workflow (YAML)
DESCRIPTION: Demonstrates how to define a step with `continue-on-error: true` and then use the new `steps.<id>.outcome` property in a subsequent step's `if` condition to check the actual result of the experimental step before `continue-on-error` is applied.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0274-step-outcome-and-conclusion.md#_snippet_0

LANGUAGE: yaml
CODE:
```
steps:

  - id: experimental
    continue-on-error: true
    run: ./build.sh experimental

  - if: ${{ steps.experimental.outcome == 'success' }}
    run: ./publish.sh experimental
```

----------------------------------------

TITLE: Test GitHub Enterprise Server Connectivity with Curl
DESCRIPTION: Use these curl commands to verify that a self-hosted runner can connect to the necessary GitHub Enterprise Server endpoints for actions, replacing `[hostname]` with your appliance's hostname. These checks cover API, codeload, vstoken, and pipelines services and help diagnose network or certificate issues.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/actions.md#_snippet_1

LANGUAGE: Shell
CODE:
```
curl -v https://[hostname]/api/v3/zen
curl -v https://codeload.[hostname]/_ping
curl -v https://[hostname]/_services/vstoken/_apis/health
curl -v https://[hostname]/_services/pipelines/_apis/health
```

----------------------------------------

TITLE: Set Fail-Fast Behavior in Bash/Sh
DESCRIPTION: This command sets options in bash/sh to enable fail-fast behavior. `set -e` causes the script to exit immediately if a command exits with a non-zero status. `set -o pipefail` causes a pipeline to return the exit status of the last command that failed, rather than the last command in the pipeline.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0277-run-action-shell-options.md#_snippet_1

LANGUAGE: bash
CODE:
```
set -e o pipefail
```

----------------------------------------

TITLE: Install GitHub Actions Runner (OSX x64)
DESCRIPTION: This bash script provides the steps to set up the GitHub Actions runner on OSX x64. It creates a directory, downloads the runner tarball using curl, and extracts the contents using tar.
SOURCE: https://github.com/actions/runner/blob/main/releaseNote.md#_snippet_3

LANGUAGE: bash
CODE:
```
# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -O -L https://github.com/actions/runner/releases/download/v<RUNNER_VERSION>/actions-runner-osx-x64-<RUNNER_VERSION>.tar.gz
# Extract the installer
tar xzf ./actions-runner-osx-x64-<RUNNER_VERSION>.tar.gz
```

----------------------------------------

TITLE: Install GitHub Actions Runner (Linux arm64)
DESCRIPTION: This bash script provides the steps to set up the GitHub Actions runner on Linux arm64. It creates a directory, downloads the runner tarball using curl, and extracts the contents using tar.
SOURCE: https://github.com/actions/runner/blob/main/releaseNote.md#_snippet_6

LANGUAGE: bash
CODE:
```
# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -O -L https://github.com/actions/runner/releases/download/v<RUNNER_VERSION>/actions-runner-linux-arm64-<RUNNER_VERSION>.tar.gz
# Extract the installer
tar xzf ./actions-runner-linux-arm64-<RUNNER_VERSION>.tar.gz
```

----------------------------------------

TITLE: Passing Input to Composite Action (Workflow YAML)
DESCRIPTION: This YAML snippet shows how to call a composite action (`user/composite@v1`) from a GitHub Actions workflow and pass a specific input parameter (`your_name`) using the `with` keyword.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_5

LANGUAGE: YAML
CODE:
```
steps: 
  - id: foo
    uses: user/composite@v1
    with:
      your_name: "Octocat"
```

----------------------------------------

TITLE: Using the shell option in GitHub Actions YAML
DESCRIPTION: Demonstrates how to specify a custom shell or interpreter for a 'run' step within a GitHub Actions workflow job using the 'shell' option, showing examples for bash and python.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0277-run-action-shell-options.md#_snippet_0

LANGUAGE: YAML
CODE:
```
jobs:
  bash-job:
    actions:
    - run: echo "Hello"
      shell: bash
  python-job:
    actions:
    - run: print("Hello")
      shell: python {0}
```

----------------------------------------

TITLE: Check DNS using nslookup (Shell)
DESCRIPTION: Uses the `nslookup` command-line tool to check DNS resolution for a hostname. This helps verify if the runner can resolve the necessary domain names for GitHub services.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/network.md#_snippet_0

LANGUAGE: Shell
CODE:
```
nslookup {hostname}
```

----------------------------------------

TITLE: Accessing Composite Action Output (Workflow YAML)
DESCRIPTION: This workflow snippet shows how to retrieve an output (`random-number`) generated by a composite action (`steps.foo`) in a subsequent step of the same workflow using the `steps` context and dot notation.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_7

LANGUAGE: YAML
CODE:
```
... steps: 
  - id: foo
    uses: user/composite@v1
  - run: echo random-number ${{ steps.foo.outputs.random-number }} 
    shell: bash
```

----------------------------------------

TITLE: Workflow Using Composite Action with Local Scripts (YAML)
DESCRIPTION: A simple workflow example demonstrating how to use a composite action that executes local scripts stored within the action's repository.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_3

LANGUAGE: YAML
CODE:
```
jobs:
  build:
    runs-on: self-hosted
    steps:
    - uses: user/composite@v1
```

----------------------------------------

TITLE: Python Shell Option Template
DESCRIPTION: This is a template string used in GitHub Actions shell options to specify that the script content (represented by `{0}`) should be executed using the `python` interpreter. This demonstrates how to configure the runner to use a non-built-in shell by providing the command and the `{0}` placeholder for the script content.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0277-run-action-shell-options.md#_snippet_7

LANGUAGE: python
CODE:
```
python {0}
```

----------------------------------------

TITLE: Trace Network Route using traceroute/tracepath/tracert (Shell)
DESCRIPTION: Uses `traceroute` (Linux/macOS), `tracepath` (Linux), or `tracert` (Windows) to display the route packets take to reach a destination. Useful for identifying network hops or firewalls blocking the path.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/network.md#_snippet_2

LANGUAGE: Shell
CODE:
```
traceroute {hostname}
```

LANGUAGE: Shell
CODE:
```
tracepath {hostname}
```

LANGUAGE: Shell
CODE:
```
tracert {hostname}
```

----------------------------------------

TITLE: Controlling Composite Action Execution with If Condition (Workflow YAML)
DESCRIPTION: This workflow snippet shows how an `if` condition (`always()`) applied to the step that uses the composite action determines whether the composite action is executed, regardless of the success or failure of previous steps in the workflow.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_9

LANGUAGE: YAML
CODE:
```
steps:
  - run: exit 1
  - uses: user/composite@v1  # <--- this will run, as it's marked as always running
    if: always()
```

----------------------------------------

TITLE: Composite Action Running Local Scripts (YAML)
DESCRIPTION: Shows how a composite action (`action.yml`) can execute scripts located within its own repository using the `$GITHUB_ACTION_PATH` or `github.action_path` context. Includes examples of using `chmod`.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_4

LANGUAGE: YAML
CODE:
```
runs:
  using: "composite"
  steps: 
    - run: chmod +x ${{ github.action_path }}/test/script2.sh
      shell: bash
    - run: chmod +x $GITHUB_ACTION_PATH/script.sh
      shell: bash
    - run: ${{ github.action_path }}/test/script2.sh
      shell: bash
    - run: $GITHUB_ACTION_PATH/script.sh
      shell: bash
```

----------------------------------------

TITLE: If Conditions Scope Within Composite Action (Action YAML)
DESCRIPTION: This `action.yml` snippet illustrates how `if` conditions (`success()`) on steps inside a composite action are evaluated based on the outcome of preceding steps *within that composite action*, showing that the parent workflow's status does not propagate.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_10

LANGUAGE: YAML
CODE:
```
runs:
  using: "composite"
  steps:
    - run: echo "just succeeding"
      shell: bash
    - run: echo "I will run, as my current scope is succeeding"
      shell: bash
      if: success()
    - run: exit 1
      shell: bash
    - run: echo "I will not run, as my current scope is now failing"
      shell: bash
```

----------------------------------------

TITLE: Checking Git Connection with ls-remote (Bash)
DESCRIPTION: This snippet shows how to use `git ls-remote --exit-code` to test if Git can connect to a remote repository URL. The `--exit-code` flag causes the command to exit with a non-zero status if the remote cannot be accessed. Environment variables `GIT_TRACE` and `GIT_CURL_VERBOSE` are set to 1 to enable detailed debugging output.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/git.md#_snippet_0

LANGUAGE: bash
CODE:
```
# For GitHub.com
git ls-remote --exit-code https://github.com/actions/checkout HEAD

# For GitHub Enterprise Server
git ls-remote --exit-code https://ghes.me/actions/checkout HEAD
```

----------------------------------------

TITLE: Node Action Configuration with Pre and Post Phases
DESCRIPTION: This YAML snippet demonstrates how to configure a Node.js GitHub Action to include 'pre' and 'post' scripts that run before and after the main action, respectively. Optional 'pre-if' and 'post-if' conditions can control execution.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0361-wrapper-action.md#_snippet_0

LANGUAGE: YAML
CODE:
```
name: 'My action with pre'
description: 'My action with pre'
runs:
  using: 'node12'
  pre: 'setup.js'
  pre-if: 'success()' // Optional
  main: 'index.js'
  post: 'cleanup.js'
  post-if: 'success()' // Optional
```

----------------------------------------

TITLE: Container Action Configuration with Pre and Post Entrypoints
DESCRIPTION: This YAML snippet shows how to configure a Container GitHub Action using 'pre-entrypoint' and 'post-entrypoint' to execute scripts before and after the main 'entrypoint'. Execution can be optionally conditional using 'pre-if' and 'post-if'.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0361-wrapper-action.md#_snippet_1

LANGUAGE: YAML
CODE:
```
name: 'My action with pre'
description: 'My action with pre'
runs:
  using: 'docker'
  image: 'mycontainer:latest'
  pre-entrypoint: 'setup.sh'
  pre-if: 'success()' // Optional
  entrypoint: 'entrypoint.sh'
  post-entrypoint: 'cleanup.sh'
  post-if: 'success()' // Optional
```

----------------------------------------

TITLE: Check Network Stack using curl (Shell)
DESCRIPTION: Uses the `curl` command with the `-v` (verbose) flag to make an HTTP request and show detailed information about the process, including headers, SSL handshake, and connection details. Good for debugging certificate and proxy issues.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/network.md#_snippet_3

LANGUAGE: Shell
CODE:
```
curl -v {url}
```

----------------------------------------

TITLE: Defining and Setting Outputs in Composite Action (Action YAML)
DESCRIPTION: This `action.yml` snippet defines an output (`random-number`) for the composite action and maps it to the output of an internal step (`random-number-generator`). It also includes the internal step that generates an output (`random-id`) using the `::set-output` command.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_8

LANGUAGE: YAML
CODE:
```
outputs:
  random-number: 
    description: "Random number"
    value: ${{ steps.random-number-generator.outputs.random-id }}
runs:
  using: "composite"
  steps: 
    - id: random-number-generator
      run: echo "::set-output name=random-id::$(echo $RANDOM)"
      shell: bash
```

----------------------------------------

TITLE: Check Network Reachability using ping (Shell)
DESCRIPTION: Uses the `ping` command-line tool to test basic network connectivity and latency to a host. This verifies if the runner machine can reach the target server.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/network.md#_snippet_1

LANGUAGE: Shell
CODE:
```
ping {hostname}
```

----------------------------------------

TITLE: Composite Action with Input Mapped Shell (YAML)
DESCRIPTION: Illustrates how a composite action can define an input and use its value to dynamically set the `shell` for a nested run step within the action.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_2

LANGUAGE: YAML
CODE:
```
inputs:
  shell_1:
    description: 'Your name'
    default: 'pwsh'
steps:
  - run: echo 1
    shell: ${{ inputs.shell_1 }}
```

----------------------------------------

TITLE: Test .NET Network Stack using Invoke-WebRequest (PowerShell)
DESCRIPTION: Uses the `Invoke-WebRequest` cmdlet in PowerShell Core to make an HTTP request to a specified URL. This tests the network capabilities from the perspective of the .NET runtime used by the runner.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/network.md#_snippet_5

LANGUAGE: PowerShell
CODE:
```
Invoke-WebRequest {url}
```

----------------------------------------

TITLE: Quickstart: Run Self-Hosted Runner Job (Bash/CMD)
DESCRIPTION: Provides a quick guide to cloning the runner repository, building the layout, configuring the runner with a repository URL and token, and starting the runner to execute a job. Requires Git, cURL, and Visual Studio (depending on platform).
SOURCE: https://github.com/actions/runner/blob/main/docs/contribute.md#_snippet_0

LANGUAGE: bash/cmd
CODE:
```
git clone https://github.com/actions/runner
cd runner/src
./dev.(sh/cmd) layout # the runner that built from source is in {root}/_layout
cd ../_layout
./config.(sh/cmd) --url https://github.com/{your-repo} --token ABCABCABCABCABCABCABCABCABCAB # accept default name, labels and work folder
./run.(sh/cmd)
```

----------------------------------------

TITLE: Check Git CLI SSL CA File Location (Bash)
DESCRIPTION: This command sequence sets the `GIT_CURL_VERBOSE` environment variable to enable verbose output for Git's curl operations, then runs `git ls-remote` to fetch remote references. The verbose output will show where Git is attempting to load trusted CA certificates from, helping diagnose SSL issues related to Git operations.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/sslcert.md#_snippet_0

LANGUAGE: Bash
CODE:
```
export GIT_CURL_VERBOSE=1
git ls-remote https://github.com/actions/runner HEAD
```

----------------------------------------

TITLE: Setting Step Timeout in Composite Action (YAML)
DESCRIPTION: Shows how to define timeouts for individual steps within a composite GitHub Action using the `timeout-minutes` attribute. Note that support for this feature in composite actions is currently limited.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0549-composite-run-steps.md#_snippet_12

LANGUAGE: yaml
CODE:
```
runs:
  using: "composite"
  steps:
    - id: foo1
      run: echo test 1
      timeout-minutes: 10
      shell: bash
    - id: foo2
      run: echo test 2
      shell: bash
    - id: foo3
      run: echo test 3
      timeout-minutes: 10
      shell: bash
```

----------------------------------------

TITLE: Checking Git Config for Extra Headers (Bash)
DESCRIPTION: These commands check the global and system-level Git configuration for the presence of `http.extraheader` entries, which can sometimes cause connection issues by adding unexpected authentication headers to requests.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/git.md#_snippet_1

LANGUAGE: bash
CODE:
```
git config --global --list | grep extraheader
```

LANGUAGE: bash
CODE:
```
git config --system --list | grep extraheader
```

----------------------------------------

TITLE: Install Actions Runner on Windows x64 (PowerShell)
DESCRIPTION: This PowerShell snippet provides commands to create a directory, download the latest Actions Runner package for Windows x64, and extract its contents. Remember to replace `<RUNNER_VERSION>` with the actual version number.
SOURCE: https://github.com/actions/runner/blob/main/releaseNote.md#_snippet_0

LANGUAGE: powershell
CODE:
```
# Create a folder under the drive root
mkdir \actions-runner ; cd \actions-runner
# Download the latest runner package
Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v<RUNNER_VERSION>/actions-runner-win-x64-<RUNNER_VERSION>.zip -OutFile actions-runner-win-x64-<RUNNER_VERSION>.zip
# Extract the installer
Add-Type -AssemblyName System.IO.Compression.FileSystem ;
[System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD\actions-runner-win-x64-<RUNNER_VERSION>.zip", "$PWD")
```

----------------------------------------

TITLE: Install GitHub Actions Runner (Linux x64)
DESCRIPTION: This bash script provides the steps to set up the GitHub Actions runner on Linux x64. It creates a directory, downloads the runner tarball using curl, and extracts the contents using tar.
SOURCE: https://github.com/actions/runner/blob/main/releaseNote.md#_snippet_5

LANGUAGE: bash
CODE:
```
# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -O -L https://github.com/actions/runner/releases/download/v<RUNNER_VERSION>/actions-runner-linux-x64-<RUNNER_VERSION>.tar.gz
# Extract the installer
tar xzf ./actions-runner-linux-x64-<RUNNER_VERSION>.tar.gz
```

----------------------------------------

TITLE: GitHub Actions Runs API Step Structure (JSON)
DESCRIPTION: Illustrates the structure of a step object within the `steps` array returned by the GitHub Actions Runs API. It shows properties like `name`, `status`, `conclusion`, `number`, `started_at`, and `completed_at`, highlighting the existing `conclusion` field which differs from the proposed `outcome` context property.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0274-step-outcome-and-conclusion.md#_snippet_1

LANGUAGE: json
CODE:
```
      "steps": [
        {
          "name": "Set up job",
          "status": "completed",
          "conclusion": "success",
          "number": 1,
          "started_at": "2020-01-09T11:06:16.000-05:00",
          "completed_at": "2020-01-09T11:06:18.000-05:00"
        },

```

----------------------------------------

TITLE: Install GitHub Actions Runner (OSX arm64)
DESCRIPTION: This bash script provides the steps to set up the GitHub Actions runner on OSX arm64 (Apple silicon). It creates a directory, downloads the runner tarball using curl, and extracts the contents using tar.
SOURCE: https://github.com/actions/runner/blob/main/releaseNote.md#_snippet_4

LANGUAGE: bash
CODE:
```
# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -O -L https://github.com/actions/runner/releases/download/v<RUNNER_VERSION>/actions-runner-osx-arm64-<RUNNER_VERSION>.tar.gz
# Extract the installer
tar xzf ./actions-runner-osx-arm64-<RUNNER_VERSION>.tar.gz
```

----------------------------------------

TITLE: Set NODE_EXTRA_CA_CERTS in Shell
DESCRIPTION: Sets the NODE_EXTRA_CA_CERTS environment variable to the path of the CA certificate file, allowing Node.js to trust custom certificates. This command is typically used in Unix-like shell environments.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/sslcert.md#_snippet_1

LANGUAGE: Shell
CODE:
```
export NODE_EXTRA_CA_CERTS=/full/path/to/cacert.pem
```

----------------------------------------

TITLE: Install GitHub Actions Runner (Linux arm)
DESCRIPTION: This bash script provides the steps to set up the GitHub Actions runner on Linux arm. It creates a directory, downloads the runner tarball using curl, and extracts the contents using tar.
SOURCE: https://github.com/actions/runner/blob/main/releaseNote.md#_snippet_7

LANGUAGE: bash
CODE:
```
# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -O -L https://github.com/actions/runner/releases/download/v<RUNNER_VERSION>/actions-runner-linux-arm-<RUNNER_VERSION>.tar.gz
# Extract the installer
tar xzf ./actions-runner-linux-arm-<RUNNER_VERSION>.tar.gz
```

----------------------------------------

TITLE: Defining MSBuild Problem Matcher Pattern (JSON)
DESCRIPTION: This JSON snippet defines a problem matcher configuration for parsing MSBuild output. It uses a regular expression to capture file path, line, column, severity, code, message, and original path from build errors and warnings, mapping them to issue properties.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md#_snippet_0

LANGUAGE: JSON
CODE:
```
{
  "owner": "msbuild",
  "pattern": [
    {
      "regexp": "^\\s*([^:]+)\\((\\d+),(\\d+)\\): (error|warning) ([^:]+): (.*) \\[(.+)\\]$",
      "file": 1,
      "line": 2,
      "column": 3,
      "severity": 4,
      "code": 5,
      "message": 6,
      "fromPath": 7
    }
  ]
}
```

----------------------------------------

TITLE: PowerShell Shell Option Template (Command Execution)
DESCRIPTION: This is a template string used in GitHub Actions shell options to specify that the script content (represented by `{0}`) should be executed using `powershell -Command`. The `&` operator is used to run the script block provided as a string. This is another way to run PowerShell scripts and customize execution.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0277-run-action-shell-options.md#_snippet_6

LANGUAGE: powershell
CODE:
```
powershell -Command "& '{0}'"
```

----------------------------------------

TITLE: Set NODE_EXTRA_CA_CERTS in Batch
DESCRIPTION: Sets the NODE_EXTRA_CA_CERTS environment variable to the path of the CA certificate file, allowing Node.js to trust custom certificates. This command is typically used in Windows Command Prompt environments.
SOURCE: https://github.com/actions/runner/blob/main/docs/checks/sslcert.md#_snippet_2

LANGUAGE: Batch
CODE:
```
set NODE_EXTRA_CA_CERTS=C:\full\path\to\cacert.pem
```

----------------------------------------

TITLE: Configuring Multi-line Problem Matcher (JSON)
DESCRIPTION: This JSON configuration defines a problem matcher for parsing multi-line output, specifically for tools like ESLint stylish. It uses two regular expressions: one to capture the file name and another with the `loop` property to capture multiple error/warning lines, extracting details like line, column, severity, message, and code.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md#_snippet_1

LANGUAGE: JSON
CODE:
```
"owner": "eslint-stylish",
"pattern": [
  {
    "regexp": "^([^\\s].*)$",
    "file": 1
  },
  {
    "regexp": "^\\s+(\\d+):(\\d+)\\s+(error|warning|info)\\s+(.*)\\s\\s+(.*)$",
    "line": 1,
    "column": 2,
    "severity": 3,
    "message": 4,
    "code": 5,
    "loop": true
  }
]
```

----------------------------------------

TITLE: Bash Shell Option Template
DESCRIPTION: This is a template string used in GitHub Actions shell options to specify that the script should be executed directly by `bash`. The `{0}` placeholder is where the script content will be inserted by the runner. This allows users to override default runner behavior like `set -e o pipefail`.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0277-run-action-shell-options.md#_snippet_2

LANGUAGE: bash
CODE:
```
bash {0}
```

----------------------------------------

TITLE: Configuring Flake8 Problem Matchers with Default Severity (JSON)
DESCRIPTION: This JSON configuration demonstrates how to use two separate problem matchers for the same tool (Flake8) to handle different severity levels. One matcher captures errors/fatals (`E` or `F` codes), while the second uses the `severity` property to explicitly set the default severity to "warning" for lines matching warning codes (`W`).
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0276-problem-matchers.md#_snippet_2

LANGUAGE: JSON
CODE:
```
{
    "problemMatcher": [
        {
            "owner": "flake8",
            "pattern": [
                {
                    "regexp": "^(.+):(\\d+):(\\d+): ([EF]\\d+) (.+)$",
                    "file": 1,
                    "line": 2,
                    "column": 3,
                    "code": 4,
                    "message": 5
                }
            ]
        },
        {
            "owner": "flake8-warnings",
            "severity": "warning",
            "pattern": [
                {
                    "regexp": "^(.+):(\\d+):(\\d+): (W\\d+) (.+)$",
                    "file": 1,
                    "line": 2,
                    "column": 3,
                    "code": 4,
                    "message": 5
                }
            ]
        }
    ]
}
```

----------------------------------------

TITLE: Pwsh Shell Option Template (File Execution)
DESCRIPTION: This is a template string used in GitHub Actions shell options to specify that the script content (represented by `{0}`) should be saved to a temporary file and executed using `pwsh -File`. This is an alternative way to run PowerShell scripts and can be used to opt out of default runner prepended commands.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0277-run-action-shell-options.md#_snippet_5

LANGUAGE: powershell
CODE:
```
pwsh -File {0}
```

----------------------------------------

TITLE: Runner Configuration (self-hosted only)
DESCRIPTION: Illustrates the process of configuring a self-hosted GitHub Actions runner, including retrieving access tokens, generating RSA keys, registering with the Actions Service and Token Service, and storing configuration files.
SOURCE: https://github.com/actions/runner/blob/main/docs/res/runner-auth-diags.txt#_snippet_0

LANGUAGE: Diagram Markup
CODE:
```
title Runner Configuration (self-hosted only)

note left of Runner: GitHub repo URL as input
Runner->github.com: Retrieve Actions Service access using runner registration token
github.com->Runner: Access token for Actions Service
note left of Runner: Generate RSA key pair
note left of Runner: Store encrypted RSA private key on disk
Runner->Actions Service: Register runner using Actions Service access token
note right of Runner: Runner name, RSA public key sent
note right of Actions Service: Public key stored
Actions Service->Token Service: Register runner as an app along with the RSA public key
note right of Token Service: Public key stored
Token Service->Actions Service: Client Id for the runner application
Actions Service->Runner: Client Id and Token Endpoint URL
note left of Runner: Store runner configuration info into .runner file
note left of Runner: Store Token registration info into .credentials file
```

----------------------------------------

TITLE: Example of Nested Composite Actions with Conditionals (YAML)
DESCRIPTION: This YAML snippet illustrates a scenario with nested composite actions to demonstrate how the proposed 'action_status' would affect step execution. It shows a parent composite action that fails early and a child composite action invoked with 'if: always()', demonstrating that the child's steps evaluate against the child's own status.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/1438-conditional-composite.md#_snippet_0

LANGUAGE: YAML
CODE:
```
- Job
  - Regular Step
  - Composite Action
    - runs: exit 1
    - if: always()
      uses: A child composite action
        - if: success()
          runs: echo "this should print"
        - runs: echo "this should also print"
    - if: success()
      runs: echo "this will not print as the current composite action has failed already"
```

----------------------------------------

TITLE: Set PowerShell Error Action Preference to Stop
DESCRIPTION: This PowerShell command sets the `$ErrorActionPreference` variable to `'stop'`. This causes PowerShell to stop executing and throw a terminating error when a non-terminating error occurs, effectively enabling fail-fast behavior. The runner prepends this to `pwsh` and `powershell` scripts by default.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0277-run-action-shell-options.md#_snippet_3

LANGUAGE: powershell
CODE:
```
$ErrorActionPreference = 'stop'
```

----------------------------------------

TITLE: Example Composite Action Step Sequence (YAML)
DESCRIPTION: Illustrates a basic sequence of steps within a composite action, including standard actions and a nested composite action, used to demonstrate pre/post step execution order.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/1144-composite-actions.md#_snippet_0

LANGUAGE: YAML
CODE:
```
- uses: action1
- uses: composite1
- uses: action2
```

----------------------------------------

TITLE: Convention-Based Cache Key in YAML
DESCRIPTION: Illustrates using a cache key based on a fixed convention combining runner OS, workspace path, and a glob pattern. While simpler than manual calculation, this method relies on a predefined format and may not accurately reflect changes in file content.
SOURCE: https://github.com/actions/runner/blob/main/docs/adrs/0279-hashFiles-expression-function.md#_snippet_1

LANGUAGE: yaml
CODE:
```
  steps:
  - uses: actions/cache@v1
    with:
      key: ${{ runner.os }}|${{ github.workspace }}|**/package-lock.json
```