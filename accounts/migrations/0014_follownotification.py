# Generated by Django 3.1.7 on 2021-03-25 08:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0013_profile_follow_requests'),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(max_length=50)),
                ('is_read', models.BooleanField(default=False)),
                ('createdAt', models.DateField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follow_notification_owner', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follow_notification_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]