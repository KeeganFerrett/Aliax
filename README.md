# Aliax

Aliax is a simple command line tool for creating permanent aliases to make your life easier.
Aliax creates and organises aliases in a structured way by saving each alias into a 'group'.

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
3. Append a line to your shells rc file to create all your aliases at the start of
a new shell session.

The setup command can also be used if you have changed shells as it will not override
any exisiting alias groups saved in the .aliases folder.

## Creating a new alias

To begin creating a new alias, use the command `aliax new`. The script will then
begin prompting you for the information needed to create the alias. The prompts
which you will be required to fill out are the following:

1. Alias Group
2. Alias Name
3. Command Type

Once all this information is captured, the new alias will be created in the alias
group's file.

### An Important Note

You will have to create a new shell session, inorder for new aliases to become active.
This is because Aliax links aliases to your shells rc file which only get executed
on start up.

### Alias Groups

The first option which you will be prompted to give is the alias group. Alias
groups is how Aliax attempts to keep all aliases organised. A group represents the
file which is stored in `.aliases` folder.

If an alias group is used for the first time, then that groups file gets created
and linked in the `aliases.symlink` file.

### Alias Name

### Command Type

#### Change Directory

Choosing this command type will create an `cd` alias to change the current
working directory to the directory where this alias was made.

For example, if the user was in their `Documents` directory and created the alias
`docs`, aliax would make an alias for the following commad: `cd /Users/username/Documents`

#### Custom

Choosing the custom command type will activate another prompt, in which you can type
any shell command. Aliax will then create an alias for this command, using the name
provided.

For example, if the you create a custom alias named `g` and wrote the command
`git` when prompted, the command `g` can be used as a short hand for git in future
shell sessions.

## Deleting an alias

If you want to delet an alias, all you need to do is go the group file, in the
`.aliases` folder, and remove the line where it is defined. Then just start a new
shell session, and the alias will be gone for good.
