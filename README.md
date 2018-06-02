# Aliax

Aliax is a simple command line tool for creating permanent aliases to make your life easier.
Aliax creates and organises aliases in a structured way

## Setup

Inorder for your shell to read the aliases which Aliax creates, some setup must be done.

To do this, simply run `aliax setup`. You will be prompted to give the shell
which you make use of. This is because different shells make use of different script
on start up. Currently, the following shells are supported by Aliax:

* Bash (.bashrc)
* Z Shell (.zshrc)
* Fish (.fishrc)

To select your shell at the start of the script, use the following command:
`aliax setup --shell <shell>` where `<shell>` is replaced by the name of your shell.

Running `aliax setup` will do the following:
1. Create a .aliases folder in your home directory, where all your alias groups
will be stored.
2. Create a file named aliases.symlink, which will link all of your alias groups
for your shells rc file.
3. Add a line to your shells rc file to create all your aliases at the start of
a new shell session.

## Creating a new alias

### Alias Groups

### Alias Name

### Command Type

#### Change Directory

Choosing this command type will will create an `cd` alias to change the current
working directory to the directory where this alias was made.

For example, if the user was in their `Documents` directory and created the alias
`docs`, aliax would make an alias for the following commad: `cd /Users/username/Documents`

#### Custom
