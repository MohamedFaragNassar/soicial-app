# Generated by Django 3.2 on 2021-05-24 07:42

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_follownotification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='cover_image',
            field=models.ImageField(blank=True, default='/media/coverImages/cover_yxdgi3.jpg', null=True, upload_to=accounts.models.cover_image_name),
        ),
        migrations.AlterField(
            model_name='profile',
            name='personal_image',
            field=models.ImageField(blank=True, default='/media/personalImages/account_yvnwmh.png', null=True, upload_to=accounts.models.personal_image_name),
        ),
    ]
