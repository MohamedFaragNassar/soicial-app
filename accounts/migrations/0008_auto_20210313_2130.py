# Generated by Django 3.1.5 on 2021-03-13 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20210130_1410'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='personal_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]