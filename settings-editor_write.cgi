#!/usr/bin/perl

#
# Authentic Theme (https://github.com/authentic-theme/authentic-theme)
# Copyright Ilia Rostovtsev <programming@rostovtsev.ru>
# Licensed under MIT (https://github.com/authentic-theme/authentic-theme/blob/master/LICENSE)
#
use strict;

use File::Basename;

our (%in, %theme_text, $has_usermin);

require(dirname(__FILE__) . "/authentic-lib.pm");

!foreign_available("webmin") && error($theme_text{'theme_error_access_not_root'});

theme_config_dir_available();

unlink_file($in{'file'});
write_file_contents($in{'file'}, $in{'data'});

if ($has_usermin) {
    (my $_file = $in{'file'}) =~ s/webmin/usermin/;
    unlink_file($_file);
    write_file_contents($_file, $in{'data'});
}
redirect("/webmin/edit_themes.cgi");
