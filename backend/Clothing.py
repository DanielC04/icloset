from settings import app
from flask_sqlalchemy import SQLAlchemy

# Datenbank initialisieren
db = SQLAlchemy(app)


class Clothing(db.Model):
    __tablename__ = 'clothing'
    id = db.Column(db.Integer, primary_key=True)  # primary key; ID erstellen
    category = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    color = db.Column(db.String(80), nullable=False)
    length = db.Column(db.Integer, nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    imgUrl = db.Column(db.String(80), nullable=True)

    def json(self):
        return {'id': self.id, 'category': self.category, 'name': self.name,
                'color': self.color, 'length': self.length, 'rating': self.rating,
                'imgUrl': self.imgUrl}

    def add_clothing(_category, _name, _color, _length, _rating, _imgUrl):
        new_clothing = Clothing(category=_category, name=_name, color=_color, length=_length, rating=_rating, imgUrl=_imgUrl)
        db.session.add(new_clothing)
        db.session.commit()  # Änderungen in die Datenbank commiten

    def get_all_clothingItems():
        return [Clothing.json(clothing) for clothing in Clothing.query.all()]

    def get_all_clothing_ids():
        return [clothing.id for clothing in Clothing.query.all()]

    def get_clothing(_id):
        return [Clothing.json(Clothing.query.filter_by(id=_id).first())]

    def get_clothing_of_category(category):
        res = []
        for clothing in Clothing.query.all():
            if clothing.category == category:
                res.append(clothing.id)
        return res

    def update_clothing(_id, _category, _name, _color, _length, _rating, _imgUrl):
        clothing_item_to_update = Clothing.query.filter_by(id=_id).first()
        clothing_item_to_update.category = _category
        clothing_item_to_update.name = _name
        clothing_item_to_update.color = _color
        clothing_item_to_update.length = _length
        clothing_item_to_update.rating = _rating
        clothing_item_to_update.imgUrl = _imgUrl
        db.session.commit()

    def delete_clothing(_id):
        Clothing.query.filter_by(id=_id).delete()
        db.session.commit()
