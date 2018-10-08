select profile.id, talk.title, profile.first_name, profile.last_name, profile.email as votes
from talk
left join profile on talk.user_id = profile.id
where is_accepted is true;
