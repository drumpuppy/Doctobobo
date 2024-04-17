DROP DATABASE doctobobo;
CREATE DATABASE doctobobo;

CREATE TABLE IF NOT EXISTS doctobobo.User (
        idPatient VARCHAR(255) PRIMARY KEY,
        Nom_Patient VARCHAR(255) NOT NULL,
        Prenom_Patient VARCHAR(255) NOT NULL,
        DateNaissance DATE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        code_postal VARCHAR(255) NOT NULL
      );

CREATE TABLE IF NOT EXISTS doctobobo.Medecin (
        idMedecin VARCHAR(255) PRIMARY KEY,
        Nom_Medecin VARCHAR(255) NOT NULL,
        Prenom_Medecin VARCHAR(255) NOT NULL,
        DateNaissance DATE NOT NULL,
        Specialite VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        code_postal VARCHAR(255) NOT NULL,
        description TEXT,
        availableTime JSON DEFAULT NULL
      );
      
CREATE TABLE IF NOT EXISTS  doctobobo.bookedAppointment (
          idAppointment VARCHAR(255) PRIMARY KEY,
          idPatient VARCHAR(255) NOT NULL,
          idDoctor VARCHAR(255) NOT NULL,
          appointmentDate VARCHAR(255) NOT NULL,
          appointmentTime JSON NOT NULL,
          patientQuery TEXT,
          prescription VARCHAR(255) DEFAULT NULL,
          patientName VARCHAR(255) NOT NULL,
          doctorName VARCHAR(255) NOT NULL
        );


INSERT INTO doctobobo.Medecin (idMedecin, Nom_Medecin, Prenom_Medecin, DateNaissance, Specialite, email, password, adresse, code_postal, description) VALUES
('id1', 'Dupont', 'Jean', '1975-02-15', 'Cardiologie', 'jean.dupont@email.com', 'password_hash', '123 rue de Paris', '75001', 'Cardiologue expérimenté'),
('id2', 'Leroy', 'Marie', '1980-04-22', 'Dermatologie', 'marie.leroy@email.com', 'password_hash', '124 rue de Paris', '75002', 'Spécialiste en dermatologie'),
('id3', 'Martin', 'Alexandre', '1982-07-11', 'Neurologie', 'alexandre.martin@email.com', 'password_hash', '125 rue de Lyon', '69001', 'Spécialiste en neurologie'),
('id4', 'Bernard', 'Claire', '1978-03-05', 'Pédiatrie', 'claire.bernard@email.com', 'password_hash', '126 rue de Marseille', '13001', 'Pédiatre avec une approche douce'),
('id5', 'Thomas', 'Étienne', '1985-05-16', 'Psychiatrie', 'etienne.thomas@email.com', 'password_hash', '127 rue de Bordeaux', '33001', 'Psychiatre expérimenté dans le traitement des troubles anxieux'),
('id6', 'Petit', 'Sophie', '1979-09-25', 'Rhumatologie', 'sophie.petit@email.com', 'password_hash', '128 rue de Nantes', '44001', 'Rhumatologue spécialisée dans l\'arthrite'),
('id7', 'Robert', 'Nicolas', '1983-11-12', 'Endocrinologie', 'nicolas.robert@email.com', 'password_hash', '129 rue de Strasbourg', '67001', 'Endocrinologue, expert en diabète'),
('id8', 'Richard', 'Julie', '1974-12-30', 'Gastroentérologie', 'julie.richard@email.com', 'password_hash', '130 rue de Lille', '59001', 'Gastroentérologue spécialisée dans les maladies inflammatoires de l\'intestin'),
('id9', 'Dubois', 'Fabien', '1986-04-19', 'Urologie', 'fabien.dubois@email.com', 'password_hash', '131 rue de Toulouse', '31001', 'Urologue traitant les troubles urinaires'),
('id10', 'Moreau', 'Laetitia', '1988-08-08', 'Ophtalmologie', 'laetitia.moreau@email.com', 'password_hash', '132 rue de Nice', '06001', 'Ophtalmologue spécialisée dans les troubles de la vision'),
('id11', 'Laurent', 'Brice', '1976-01-22', 'Orthopédie', 'brice.laurent@email.com', 'password_hash', '133 rue de Montpellier', '34001', 'Orthopédiste traitant les fractures complexes'),
('id12', 'Simon', 'Amandine', '1990-10-05', 'Cardiologie', 'amandine.simon@email.com', 'password_hash', '134 rue de Rennes', '35001', 'Cardiologue spécialisée dans l\'insuffisance cardiaque'),
('id13', 'Michel', 'Romain', '1981-06-17', 'Dermatologie', 'romain.michel@email.com', 'password_hash', '135 rue de Reims', '51100', 'Dermatologue traitant les maladies de peau'),
('id14', 'Lefevre', 'Charlotte', '1989-07-09', 'Pédiatrie', 'charlotte.lefevre@email.com', 'password_hash', '136 rue de Le Havre', '76600', 'Pédiatre spécialisée dans le suivi des nourrissons'),
('id15', 'Leroy', 'Guillaume', '1975-04-28', 'Psychiatrie', 'guillaume.leroy@email.com', 'password_hash', '137 rue de Grenoble', '38001', 'Psychiatre focalisé sur la psychothérapie'),
('id16', 'Roux', 'Émilie', '1991-12-14', 'Rhumatologie', 'emilie.roux@email.com', 'password_hash', '138 rue de Dijon', '21000', 'Rhumatologue expérimentée dans l\'ostéoporose'),
('id17', 'David', 'Jérôme', '1972-08-20', 'Endocrinologie', 'jerome.david@email.com', 'password_hash', '139 rue de Limoges', '87000', 'Expert en troubles hormonaux'),
('id18', 'Bertrand', 'Anne', '1984-11-30', 'Gastroentérologie', 'anne.bertrand@email.com', 'password_hash', '140 rue de Rouen', '76000', 'Gastroentérologue avec une expertise en hépatologie'),
('id19', 'Morel', 'Benoît', '1977-02-18', 'Urologie', 'benoit.morel@email.com', 'password_hash', '141 rue de Amiens', '80000', 'Urologue expérimenté dans le traitement de l\'infertilité'),
('id20', 'Fournier', 'Sandrine', '1969-09-09', 'Ophtalmologie', 'sandrine.fournier@email.com', 'password_hash', '142 rue de Clermont-Ferrand', '63000', 'Spécialiste en chirurgie réfractive');

INSERT INTO doctobobo.Medecin (idMedecin, Nom_Medecin, Prenom_Medecin, DateNaissance, Specialite, email, password, adresse, code_postal, description) VALUES
('id21', 'Girard', 'Mathieu', '1987-03-21', 'Anesthésiologie', 'mathieu.girard@email.com', 'password_hash', '143 rue de Clermont-Ferrand', '63001', 'Spécialiste en anesthésie et réanimation'),
('id22', 'Perrin', 'Nathalie', '1971-07-15', 'Neurochirurgie', 'nathalie.perrin@email.com', 'password_hash', '144 rue de Saint-Etienne', '42001', 'Neurochirurgienne avec une longue expérience'),
('id23', 'Lemoine', 'Philippe', '1989-11-30', 'Oncologie', 'philippe.lemoine@email.com', 'password_hash', '145 rue de Brest', '29200', 'Oncologue spécialisé dans le traitement des cancers rares'),
('id24', 'Moulin', 'Isabelle', '1978-01-25', 'Pédiatrie', 'isabelle.moulin@email.com', 'password_hash', '146 rue de Tours', '37000', 'Pédiatre dédiée aux soins primaires des enfants'),
('id25', 'Marchand', 'Thierry', '1965-05-19', 'Radiologie', 'thierry.marchand@email.com', 'password_hash', '147 rue de Metz', '57000', 'Radiologue spécialisé en imagerie musculosquelettique'),
('id26', 'Dufour', 'Cécile', '1982-09-12', 'Cardiologie', 'cecile.dufour@email.com', 'password_hash', '148 rue de Besançon', '25000', 'Cardiologue avec un intérêt particulier pour l\'arythmie'),
('id27', 'Lambert', 'Dominique', '1970-04-07', 'Dermatologie', 'dominique.lambert@email.com', 'password_hash', '149 rue de Caen', '14000', 'Dermatologue spécialisée dans le psoriasis'),
('id28', 'Bonnet', 'Frédéric', '1993-12-13', 'Endocrinologie', 'frederic.bonnet@email.com', 'password_hash', '150 rue de Orleans', '45000', 'Endocrinologue, expert en maladies thyroïdiennes'),
('id29', 'Francois', 'Stéphanie', '1985-08-09', 'Gastroentérologie', 'stephanie.francois@email.com', 'password_hash', '151 rue de Angers', '49000', 'Gastroentérologue, focalisée sur les maladies inflammatoires'),
('id30', 'Martinez', 'Lucas', '1972-11-25', 'Urologie', 'lucas.martinez@email.com', 'password_hash', '152 rue de Nîmes', '30000', 'Urologue spécialisé dans la chirurgie laparoscopique'),
('id31', 'Legrand', 'Valérie', '1984-02-18', 'Ophtalmologie', 'valerie.legrand@email.com', 'password_hash', '153 rue de Le Mans', '72000', 'Ophtalmologue avec une expertise en glaucome'),
('id32', 'Garnier', 'Julien', '1976-03-22', 'Orthopédie', 'julien.garnier@email.com', 'password_hash', '154 rue de Aix-en-Provence', '13090', 'Orthopédiste spécialisé dans la chirurgie du genou'),
('id33', 'Faure', 'Sylvie', '1991-07-11', 'Psychiatrie', 'sylvie.faure@email.com', 'password_hash', '155 rue de Limoges', '87000', 'Psychiatre intéressée par les thérapies cognitivo-comportementales'),
('id34', 'Rousseau', 'Vincent', '1969-08-26', 'Rhumatologie', 'vincent.rousseau@email.com', 'password_hash', '156 rue de Clermont', '63000', 'Rhumatologue avec une spécialisation en spondylarthrite'),
('id35', 'Blanc', 'Emmanuelle', '1990-10-14', 'Neurologie', 'emmanuelle.blanc@email.com', 'password_hash', '157 rue de Poitiers', '86000', 'Neurologue spécialisée dans les maladies dégénératives'),
('id36', 'Guillaume', 'Béatrice', '1986-01-30', 'Anesthésiologie', 'beatrice.guillaume@email.com', 'password_hash', '158 rue de Avignon', '84000', 'Anesthésiste-réanimateur avec une approche centrée sur le patient'),
('id37', 'Lefebvre', 'Marc', '1974-06-15', 'Oncologie', 'marc.lefebvre@email.com', 'password_hash', '159 rue de Perpignan', '66000', 'Oncologue médical spécialisé dans les traitements innovants'),
('id38', 'Mercier', 'Denise', '1988-05-22', 'Radiologie', 'denise.mercier@email.com', 'password_hash', '160 rue de Nancy', '54000', 'Radiologue expérimentée en mammographie'),
('id39', 'Dupuis', 'Antoine', '1979-04-09', 'Cardiologie', 'antoine.dupuis@email.com', 'password_hash', '161 rue de Roubaix', '59100', 'Cardiologue, expert en échocardiographie'),
('id40', 'Vasseur', 'Louise', '1994-12-03', 'Dermatologie', 'louise.vasseur@email.com', 'password_hash', '162 rue de Béziers', '34500', 'Dermatologue intéressée par la dermatologie esthétique');

ALTER TABLE doctobobo.User
ADD COLUMN accepted_cgu BOOLEAN DEFAULT false;

ALTER TABLE doctobobo.Medecin
ADD COLUMN accepted_cgu BOOLEAN DEFAULT false;