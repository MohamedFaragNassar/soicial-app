# Generated by Django 3.1.5 on 2021-01-30 12:10

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210121_0842'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='image',
            field=models.ImageField(null=True, upload_to=api.models.image_name),
        ),
    ]
