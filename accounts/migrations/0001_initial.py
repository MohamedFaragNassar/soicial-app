# Generated by Django 3.1.5 on 2021-01-14 12:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('birthday', models.DateTimeField(auto_now_add=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('website', models.CharField(max_length=220, null=True)),
                ('location', models.CharField(max_length=220, null=True)),
                ('personal_image', models.ImageField(null=True, upload_to='personalImages')),
                ('cover_image', models.ImageField(null=True, upload_to='coverImages')),
                ('followes', models.ManyToManyField(blank=True, related_name='following', to=settings.AUTH_USER_MODEL)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]