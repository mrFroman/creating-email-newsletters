#!/bin/bash

mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/01_init.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_auth_group.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_auth_group_permissions.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_auth_permission.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_django_admin_log.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_django_content_type.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_django_migrations.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_django_session.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_main_mainindex.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_main_user.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_main_user_groups.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_main_UrlsContent.sql
mysql --user=root --password=DfyLthCfhyjvth1 --database=template_bs --force < /tmp/dump/data_bases_main_UrlsPoster.sql
