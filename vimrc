" System vimrc file for MacVim
"
" Maintainer:	Bjorn Winckler <bjorn.winckler@gmail.com>
" Last Change:	Sat Aug 29 2009


" The default for 'backspace' is very confusing to new users, so change it to a
" more sensible value.  Add "set backspace&" to your ~/.vimrc to reset it.
set backspace+=indent,eol,start

" Disable localized menus for now since only some items are translated (e.g.
" the entire MacVim menu is set up in a nib file which currently only is
" translated to English).
set langmenu=none

set nocompatible
set tabstop=4
set nu
colorscheme desert

set encoding=utf-8
set termencoding=utf-8
set fileencoding=utf-8
set fileencodings=ucs-bom,utf-8,chinese,cp936 

