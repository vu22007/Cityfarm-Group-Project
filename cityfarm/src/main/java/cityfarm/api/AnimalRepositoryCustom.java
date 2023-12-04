package cityfarm.api;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AnimalRepositoryCustom {

    private final MongoOperations mongoOperations;

    public AnimalRepositoryCustom(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public List<AnimalGeneric> findAnimalByName(String name){
        Criteria regex = Criteria.where(name).regex(".*ab.*", "i");
        return mongoOperations.find(new Query().addCriteria(regex), AnimalGeneric.class);
    }


}